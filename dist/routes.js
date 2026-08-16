"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SimulationController_1 = require("./controllers/SimulationController");
const UploadController_1 = require("./controllers/UploadController");
const router = (0, express_1.Router)();
const controller = new SimulationController_1.SimulationController();
const uploadController = new UploadController_1.UploadController();
// --- Fluxo Completo Automático (BenBridge Engine) ---
router.post('/process', controller.processFull.bind(controller));
router.post('/process-smart-creation', controller.processSmartCreation.bind(controller));
router.post('/process-creation', controller.processCreationOnly.bind(controller));
router.post('/process-finish-in100/:internalId', controller.checkIn100AndFinish.bind(controller));
// --- Fluxos Parciais (Manuais) ---
router.post('/smart-calculation', controller.calculateSmart.bind(controller));
router.post('/calculation', controller.calculate.bind(controller));
router.post('/simulations', controller.create.bind(controller));
router.get('/simulation/:id/auth-term', controller.getAuthTerm.bind(controller));
router.put('/signer/:key/accept', controller.acceptAuthTerm.bind(controller));
router.post('/simulation/:id/actions', controller.createContracts.bind(controller));
router.get('/loans/simulation/:id', controller.queryContracts.bind(controller));
// --- Helper (Local DB) ---
router.get('/internal-status/:internalId', controller.getLocalStatus.bind(controller));
// --- Upload Seguro ---
router.post('/upload-document', uploadController.uploadDocument.bind(uploadController));
router.post('/upload-document-url', uploadController.uploadByUrl.bind(uploadController));
exports.default = router;
