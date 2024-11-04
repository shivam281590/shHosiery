var express = require('express');
var router = express.Router();
var LoginController=require('../controllers/admin/auth/LoginController');
var InvoiceController=require('../controllers/admin/InvoiceController');
var invoiceController=new InvoiceController();
var {adminRoutes}=require('../config/route');
const { generateCsrfToken, validateCsrfToken } = require('../middlewares/csrfToken');
const { redirectIfUserHaveAuth, redirectIfUserIsNotAuthenticated } = require('../middlewares/auth');
const setRoute = require('../middlewares/setRoute');
const bcryptjs=require('bcryptjs');

router.use(generateCsrfToken);

router.use(['POST','DELETE','PUT','PATCH'],validateCsrfToken);

router.get(adminRoutes.getLogin,redirectIfUserHaveAuth,LoginController.index);
router.post(adminRoutes.postLogin,redirectIfUserHaveAuth,LoginController.auth);

/* GET home page. */

router.use(redirectIfUserIsNotAuthenticated);
router.use(setRoute);

/**
 * Invoice
 */
router.get(adminRoutes.invoiceList,invoiceController.getAllInvoice);
router.get(adminRoutes.createInvoice,invoiceController.createInvoice);
router.post(adminRoutes.createInvoice,invoiceController.store);
router.get(adminRoutes.editInvoice,invoiceController.edit);
router.post(adminRoutes.editInvoice,invoiceController.update);
router.post(adminRoutes.deleteInvoice,invoiceController.delete);
router.post(adminRoutes.downloadInvoicePDF,invoiceController.downloadFile);
// router.get(adminRoutes.generateInvoice,invoiceController.generateInvoice);
router.get(adminRoutes.pdfViewer,invoiceController.pdfViewer);


router.get('/', function(req, res, next) {
  res.render('admin/dashboard/index', { title: 'Express',pageTitle:'Dashboard' });
});

router.post(adminRoutes.logout,LoginController.logout);

module.exports = router;
