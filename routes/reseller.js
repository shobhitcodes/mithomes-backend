const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');

const resellerController = require('../controllers/resellerController');

// routes
router.get('/getByUser/:id', auth, resellerController.getByUserId);
router.put('/:id', auth, resellerController.update);

// leads
router.post('/lead/:propertyId', auth, resellerController.createLead);
router.get('/lead/getAll', auth, admin, resellerController.getAllLeads);
router.get('/lead/:propertyId', auth, resellerController.getLeadsByPropertyId);
router.get('/lead', auth, resellerController.getLeads);

// listingRequest
router.post('/listingRequest', auth, resellerController.createListingRequest);
router.get('/listingRequest', auth, admin, resellerController.getAllListingRequests);
router.patch('/listingRequest/markComplete/:listingId', auth, admin, resellerController.markListingRequestComplete);

// whishlist
router.get('/whishlist', auth, resellerController.getWhishList);
router.post('/whishlist/addFavourite/:propertyId', auth, resellerController.addFavourite);
router.post('/whishlist/removeFavourite/:propertyId', auth, resellerController.removeFavourite);

module.exports = router;
