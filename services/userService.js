'use strict';

const bcrypt = require('bcrypt');
const axios = require('axios');

// model imports
const User = require('../models/user');
const userAuth = require('../models/userAuth');

// public interface
module.exports.register = register;
module.exports.auth = auth;
module.exports.getUserById = getUserById;
module.exports.OTPRegistration = OTPRegistration;
module.exports.update = update;
module.exports.getAllPatients = getAllPatients;
module.exports.getAllDoctors = getAllDoctors;
module.exports.changePassword = changePassword;
module.exports.forgotPassword = forgotPassword;
module.exports.generateOTP = generateOTP;
module.exports.resendOTP = resendOTP;
module.exports.OTPAuth = OTPAuth;
module.exports.getById = getById;
module.exports.generateRegisterOTP = generateRegisterOTP;
module.exports.getAll = getAll;

/**
 * @async
 * @description registers user
 * @param {*} name
 * @param {*} email
 * @param {*} mobile
 * @param {*} password
 * @param {*} role
 * @returns
 */
async function register(name, email, mobile, password, role = 'customer') {
    try {
        // email check
        let emailFound = email && (await User.findOne({ email }));
        let mobileFound = mobile && (await User.findOne({ mobile }));

        if (emailFound || mobileFound) throw 'User already registered';

        // creating new user
        let user = new User({
            name,
            email,
            password,
            mobile,
            role,
        });

        user.password = await bcrypt.hash(user.password, 10);

        user = await user.save();

        delete user.password;

        return user;
    } catch (err) {
        console.error('Error on register service: ', err);
        throw err;
    }
}

/**
 * @async
 * @param {*} mobile
 * @param {*} email
 * @param {*} password
 */
async function auth(mobile, email, password) {
    try {
        const userQuery = {
            active: true,
        };

        mobile && (userQuery.mobile = mobile);
        email && (userQuery.email = email);

        let user = await User.findOne(userQuery);

        if (!user) throw 'Invalid credentials';

        if (!user.password)
            throw 'Please login via OTP, there is no password attached with this user.';

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) throw 'Invalid credentials';

        return user;
    } catch (err) {
        console.error('Error on auth service: ', err);
        throw err;
    }
}

/**
 * @async
 * @param {*} userId
 */
async function getUserById(userId) {
    try {
        if (!userId) throw 'userId missing';

        const user = await User.findById(userId).select('-password');
        return user;
    } catch (err) {
        console.error('Error on getUserById service: ', err);
        throw err;
    }
}

async function OTPRegistration(otp, mobile) {
    try {
        const _userAuth = await userAuth
            .find({ mobile, type: 'register', active: true, used: false })
            .sort({ _id: -1 })
            .limit(1);
        

        if (!_userAuth) throw 'Invalid mobile number or OTP';
        if (!_userAuth[0]) throw 'Invalid mobile number or OTP';
        if (_userAuth[0].otp !== otp) throw 'Invalid OTP';

        await userAuth.updateOne(
            { _id: _userAuth[0]._id },
            { used: true, active: false }
        );

        const userDetails = _userAuth[0].meta;

        // creating new user
        let user = new User({
            mobile,
            ...userDetails,
        });

        user.password = await bcrypt.hash(userDetails.password, 10);

        user = await user.save();

        delete user.password;

        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function generateRegisterOTP(mobile, email, name, password, role = 'customer') {
    try {
        let emailFound = email && (await User.findOne({ email }));
        let mobileFound = mobile && (await User.findOne({ mobile }));

        if (emailFound || mobileFound) throw 'User already registered';

        let otp = parseInt(Math.random() * 10000) + '';

        if (otp.length < 4) {
            otp = '0' + otp;
        }

        await userAuth.create({
            otpUsed: false,
            otp: otp,
            type: 'register',
            mobile,
            meta: { name, email, password, role },
        });

        let template = 'SignUp for MIT-Homes';

        return sendOTP(mobile, otp, template);
    } catch (err) {
        console.error('Error on generateSignUpOTP service: ', err);
        throw err;
    }
}

async function generateOTP(mobile, type = 'login') {
    try {
        let user = await User.findOne({ mobile });

        if (!user) throw 'Invalid mobile number';

        let otp = parseInt(Math.random() * 10000) + '';

        if (otp.length < 4) {
            otp = '0' + otp;
        }

        const _userAuth = await userAuth.create({
            userId: user._id,
            otpUsed: false,
            otp: otp,
            type: type,
            mobile,
        });

        let template = '';

        if (type === 'Login') {
            template = 'OTP%20Login';
        }
        if (type === 'PasswordChange') {
            template = 'Password%20Reset%20OTP';
        }

        return sendOTP(mobile, otp, template);
    } catch (error) {
        console.error('Error on generateOTP service: ', error);
        throw error;
    }
}

async function resendOTP(mobileNo) {
    try {
        const _userAuth = await userAuth
            .find({ mobileNo })
            .sort({ _id: -1 })
            .limit(1);
        if (!userAuth) throw 'Invalid Mobile Number';
        const isOTPSend = await sendOTP(
            mobileNo,
            _userAuth[0].otp,
            'OTP%20Login'
        );
        return isOTPSend;
    } catch (error) {
        console.error('Error on login service: ', error);
        throw error;
    }
}

async function sendOTP(mobile, otp, template) {
    try {
        const url = `https://2factor.in/API/V1/${process.env.2FACTOR_API_KEY}/SMS/+91${mobile}/${otp}/${template}`;
        const otpResponse = await axios.get(url);

        if (otpResponse.status === 200) {
            return true;
        } else throw otpResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function OTPAuth(otp, mobile) {
    try {
        const _userAuth = await userAuth
            .find({ mobile, active: true, type: 'login' })
            .sort({ _id: -1 })
            .limit(1);
        if (!_userAuth) throw 'Invalid Mobile Number Or OTP';
        if (!_userAuth[0]) throw 'Invalid Mobile Number Or OTP';
        if (_userAuth[0].otp !== otp) throw 'Invalid OTP';

        await userAuth.updateOne({ _id: _userAuth[0]._id }, { used: true, active: false });

        const user = await User.findOne({ mobile, active: true });

        if (!user) throw 'Invalid User';

        delete user.password;

        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * @async
 * @description get All Patients for admin
 */
async function getAllPatients(limit, offset) {
    try {
        const users = await User.find({
            role: 'patient',
            active: true,
        })
            .select('-password')
            .sort({ _id: -1 })
            .limit(limit)
            .skip(offset);

        return users;
    } catch (err) {
        console.error('Error on User service: ', err);
        throw err;
    }
}

/**
 * @async
 * @description get All Doctors for admin
 */
async function getAllDoctors(limit, offset) {
    try {
        const users = await User.find({
            role: 'doctor',
            active: true,
        })
            .select('-password')
            .sort({ _id: -1 })
            .limit(limit)
            .skip(offset);

        return users;
    } catch (err) {
        console.error('Error on User service: ', err);
        throw err;
    }
}

async function forgotPassword(mobile) {
    try {
        const user = await User.findOne({ mobile, active: true });
        if (!user) throw 'Invalid Mobile Number';
        return generateOTP(mobile, 'passwordChange');
    } catch (error) {
        console.error('Error on User service: ', error);
        throw error;
    }
}

async function changePassword(mobileNo, otp, newPassword) {
    try {
        const otpAuth = await userAuth.find({
            mobileNo,
            type: 'passwordChange',
            active: true,
        });

        if (!otpAuth) throw 'Invalid Mobile Number Or OTP';
        if (!otpAuth[0]) throw 'Invalid Mobile Number Or OTP';
        if (otpAuth[0].otp !== otp) throw 'Invalid OTP';

        otpAuth[0].active = false;
        otpAuth[0].save();
        const user = await User.findOne({ mobile, active: true });
        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();
        return true;
    } catch (error) {
        console.error('Error on User service: ', error);
        throw error;
    }
}

async function update(id, user) {
    try {
        if (!id || !user) throw 'required data missing';

        user = await User.findByIdAndUpdate(id, user, {
            new: true,
        }).lean();

        if (!user) throw 'user not found';

        delete user.password;
        return user;
    } catch (err) {
        console.error('Error on update user service: ', err);
        throw err;
    }
}

async function getById(id) {
    try {
        if (!id) throw 'id missing';

        const user = await User.findById(id).lean();
        delete user.password;
        return user;
    } catch (err) {
        console.error('Error on getById user service: ', err);
        throw err;
    }
}

async function getAll() {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        console.error('Error on getAll user service: ', err);
        throw err;
    }
}
