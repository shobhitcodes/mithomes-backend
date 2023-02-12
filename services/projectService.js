'use strict';

// model imports
const Project = require('../models/project');

// public interface
module.exports.getById = getById;
module.exports.getByUserId = getByUserId;
module.exports.getAll = getAll;
module.exports.create = create;
module.exports.update = update;
module.exports.deleteOne = deleteOne;

async function getById(id) {
    try {
        if (!id) throw 'id missing';

        const project = await Project.findById(id);
        return project;
    } catch (err) {
        console.error('Error on getById project service: ', err);
        throw err;
    }
}

async function getByUserId(id) {
    try {
        if (!id) throw 'id missing';

        const projects = await Project.find({ userId: id });
        return projects;
    } catch (err) {
        console.error('Error on getByUserId project service: ', err);
        throw err;
    }
}

async function getAll() {
    try {
        const projects = await Project.find();
        return projects;
    } catch (err) {
        console.error('Error on getAll project service: ', err);
        throw err;
    }
}

async function create(project) {
    try {
        if (!project) throw 'data missing';

        project = new Project(project);
        project = await project.save();

        return project;
    } catch (err) {
        console.error('Error on create project service: ', err);
        throw err;
    }
}

async function update(id, project) {
    try {
        if (!id || !project) throw 'required data missing';

        project = await Project.findByIdAndUpdate(id, project, {
            new: true,
        });

        if (!project) throw 'project not found';

        return project;
    } catch (err) {
        console.error('Error on create project service: ', err);
        throw err;
    }
}

async function deleteOne(id) {
    try {
        if (!id) throw 'id missing';

        return await Project.findByIdAndDelete(id);
    } catch (err) {
        console.error('Error on deleteOne project service: ', err);
        throw err;
    }
}
