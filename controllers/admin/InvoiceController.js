const {Customer,Invoice,InvoiceItem,Config,sequelize}=require('../../models');
const validator=require('validator');
const puppeteer=require('puppeteer');
const fs=require('fs');
const path=require('path');
const {getRootDir}=require('../../utilities/helper');


class InvoiceController{
    constructor(){

    }

    getAllInvoice=async(req,res,next)=>{
        let {page}=req.query;
        page=parseInt(page) || 1;
        let limit=10;
        let offset=(page-1)*limit;
        let allInvoice= await Invoice.findAll({order:[['createdAt','DESC']],offset,limit});
        let pages=await Invoice.count();
        return res.render('admin/invoice/index',{pageTitle:'Invoices',allInvoice,pages:Math.ceil(pages/limit),currentPage:page});
    }

    createInvoice=async(req,res,next)=>{
        let allCustomers=await Customer.findAll({order:[['shopName','ASC'],['createdAt','DESC']]})
        let {
            shopNameError,
            mobileError,
            emailAddressError,
            addressError,
            cityError,
            stateError,
            countryError,
            cTypeError,
            gstError,
            pinCodeError,
            mobile,
            items,
            cType,
            shopName,
            gst,
            email,
            address,
            city,
            state,
            country,
            pinCode,
            customerId
        }=req.query;
        return res.render('admin/invoice/create',{
            pageTitle:'Create Invoice',
            shopNameError,
            mobileError,
            emailAddressError,
            addressError,
            cityError,
            stateError,
            countryError,
            cTypeError,
            gstError,
            pinCodeError,
            allCustomers,
            mobile,
            items:items?JSON.parse(items):[],
            cType,
            shopName,
            gst,
            email,
            address,
            city,
            state,
            country,
            pinCode,
            customerId
        });
    }

    store=async(req,res,next)=>{
        const trans=await sequelize.transaction();
        try{
            if(validator.isEmpty(req.body.mobile || '')){
                return res.redirect(`/admin${res.locals.adminRoutes.createInvoice}?mobileError=This field is required!&mobile=${encodeURIComponent(req.body.mobile || '')}&items=${encodeURIComponent(JSON.stringify(req.body.items) || [])}&cType=${encodeURIComponent(req.body.cType || '')}&shopName=${encodeURIComponent(req.body.shopName || '')}&gst=${encodeURIComponent(req.body.gst || '')}&email=${encodeURIComponent(req.body.email || '')}&address=${encodeURIComponent(req.body.address || '')}&city=${encodeURIComponent(req.body.city || '')}&state=${encodeURIComponent(req.body.state || '')}&country=${encodeURIComponent(req.body.country || '')}&pinCode=${encodeURIComponent(req.body.pinCode || '')}&customerId=${encodeURIComponent(req.body.customerId || '')}`);
            }

            let invoice=await Invoice.create({
                userId:req.session.authUser.id,
                cType: req.body.cType || 'fixed',
                customerId: req.body.customerId || null,
                shopName: req.body.shopName,
                gst: req.body.gst,
                mobile: req.body.mobile,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                pinCode: req.body.pinCode,
            },{transaction:trans});
            let subTotal=0.00;
            for (const element of req.body.items) {
                subTotal += Number(element.total);
                await InvoiceItem.create({
                    invoiceId: invoice.id,
                    itemDescription: element.itemDescription,
                    HSNCode: element.HSNCode ?? '',
                    qty: element.qty,
                    unit: element.unit,
                    price: element.price,
                    total: element.total
                }, { transaction: trans });
            }
            let taxSGST=await Config.findOne({where:{key:'tax.sgst'}});
            let taxCGST=await Config.findOne({where:{key:'tax.cgst'}});
            let discount=await Config.findOne({where:{key:'discount'}});

            let sgstAmount=0,cgstAmount=0,discountAmount=0;

            if(taxSGST){
                sgstAmount=(Number(taxSGST.value)/100)*subTotal;
            }
            if(taxCGST){
                cgstAmount=(Number(taxCGST.value)/100)*subTotal;
            }
            if(discount){
                discountAmount=(Number(discount.value)/100)*subTotal;
            }


            let total=(subTotal+sgstAmount+cgstAmount)-discountAmount;
            invoice.subTotal=subTotal;
            invoice.sgst=sgstAmount;
            invoice.cgst=cgstAmount;
            invoice.discount=discountAmount;
            invoice.total=total;

            await invoice.save({ transaction: trans });

            
            
            
            
            await trans.commit();
            /**
             * Generate PDF
             */
            res.render(
                'admin/invoice/invoice',
                {
                    items: req.body.items??[],
                    subTotal: invoice.subTotal,
                    sgst: invoice.sgst,
                    cgst: invoice.cgst,
                    discount: invoice.discount,
                    total: invoice.total
                },
                async (err, html) => {
                    if (err) {
                        return next(err);
                    }

                    const browser = await puppeteer.launch({
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    });
    
                    try {
                        const page = await browser.newPage();
                        await page.setContent(html);
                        const pdfBuffer = await page.pdf({ format: 'A4',printBackground: true });
                        let pdfName=`${invoice.mobile}-${invoice.shopName??'invoice'}-${parseInt(invoice.id)}.pdf`;
                        let filePath=path.resolve(getRootDir(),'storage/public/invoice', pdfName);
                        fs.writeFileSync(filePath, pdfBuffer);
                    } catch (pdfError) {
                        console.error("Error generating PDF:", pdfError);
                    } finally {
                        await browser.close();
                    }
                }
            );

            return res.redirect(`/admin${res.locals.adminRoutes.invoiceList}`);

        }
        catch(err){
            console.log(err);
            await trans.rollback();
            return next(err);
        }
        
    }

    edit=async(req,res,next)=>{
        let invoiceId=req.params.invoiceId || '';
        let invoice=await Invoice.findOne({where:{id:invoiceId},include:'items'});

        let allCustomers=await Customer.findAll({order:[['shopName','ASC'],['createdAt','DESC']]})
        let {
            shopNameError,
            mobileError,
            emailAddressError,
            addressError,
            cityError,
            stateError,
            countryError,
            cTypeError,
            gstError,
            pinCodeError,
        }=req.query;
        return res.render('admin/invoice/edit',{
            invoiceId,
            pageTitle:'Update Invoice',
            shopNameError,
            mobileError,
            emailAddressError,
            addressError,
            cityError,
            stateError,
            countryError,
            cTypeError,
            gstError,
            pinCodeError,
            allCustomers,
            mobile:invoice.mobile,
            items:invoice.items,
            cType:invoice.cType,
            shopName:invoice.shopName,
            gst:invoice.gst,
            email:invoice.email,
            address:invoice.address,
            city:invoice.city,
            state:invoice.state,
            country:invoice.country,
            pinCode:invoice.pinCode,
            customerId:invoice.customerId
        });
    }

    update=async(req,res,next)=>{
        const trans=await sequelize.transaction();
        try{
            if(validator.isEmpty(req.body.mobile || '')){
                return res.redirect(`/admin${res.locals.adminRoutes.editInvoice}?mobileError=This field is required!&mobile=${encodeURIComponent(req.body.mobile || '')}&items=${encodeURIComponent(JSON.stringify(req.body.items) || [])}&cType=${encodeURIComponent(req.body.cType || '')}&shopName=${encodeURIComponent(req.body.shopName || '')}&gst=${encodeURIComponent(req.body.gst || '')}&email=${encodeURIComponent(req.body.email || '')}&address=${encodeURIComponent(req.body.address || '')}&city=${encodeURIComponent(req.body.city || '')}&state=${encodeURIComponent(req.body.state || '')}&country=${encodeURIComponent(req.body.country || '')}&pinCode=${encodeURIComponent(req.body.pinCode || '')}&customerId=${encodeURIComponent(req.body.customerId || '')}`);
            }

            let invoiceId=req.params.invoiceId || '';

            let invoice=await Invoice.findOne({where:{id:invoiceId},include:'items'});

            // invoice.userId=req.session.authUser.id;
            invoice.cType=req.body.cType || 'fixed';
            invoice.customerId=req.body.customerId || null;
            invoice.shopName=req.body.shopName;
            invoice.gst=req.body.gst;
            invoice.mobile=req.body.mobile;
            invoice.email=req.body.email;
            invoice.address=req.body.address;
            invoice.city=req.body.city;
            invoice.state=req.body.state;
            invoice.country=req.body.country;
            invoice.pinCode=req.body.pinCode;

            let subTotal=0.00;
            await InvoiceItem.destroy({where:{invoiceId:invoiceId}},{transaction:trans});

            for (const element of req.body.items) {
                subTotal += Number(element.total);
                await InvoiceItem.create({
                    invoiceId: invoice.id,
                    itemDescription: element.itemDescription,
                    HSNCode: element.HSNCode ?? '',
                    qty: element.qty,
                    unit: element.unit,
                    price: element.price,
                    total: element.total
                }, { transaction: trans });
            }
            let taxSGST=await Config.findOne({where:{key:'tax.sgst'}});
            let taxCGST=await Config.findOne({where:{key:'tax.cgst'}});
            let discount=await Config.findOne({where:{key:'discount'}});

            let sgstAmount=0,cgstAmount=0,discountAmount=0;

            if(taxSGST){
                sgstAmount=(Number(taxSGST.value)/100)*subTotal;
            }
            if(taxCGST){
                cgstAmount=(Number(taxCGST.value)/100)*subTotal;
            }
            if(discount){
                discountAmount=(Number(discount.value)/100)*subTotal;
            }


            let total=(subTotal+sgstAmount+cgstAmount)-discountAmount;
            invoice.subTotal=subTotal;
            invoice.sgst=sgstAmount;
            invoice.cgst=cgstAmount;
            invoice.discount=discountAmount;
            invoice.total=total;

            await invoice.save({ transaction: trans });
            await trans.commit();

             /**
             * Generate PDF
             */
             res.render(
                'admin/invoice/invoice',
                {
                    items: req.body.items??[],
                    subTotal: invoice.subTotal,
                    sgst: invoice.sgst,
                    cgst: invoice.cgst,
                    discount: invoice.discount,
                    total: invoice.total
                },
                async (err, html) => {
                    if (err) {
                        return next(err);
                    }

                    const browser = await puppeteer.launch({
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    });
    
                    try {
                        const page = await browser.newPage();
                        await page.setContent(html);
                        const pdfBuffer = await page.pdf({ format: 'A4',printBackground: true });
                        let pdfName=`${invoice.mobile}-${invoice.shopName??'invoice'}-${parseInt(invoice.id)}.pdf`;
                        let filePath=path.resolve(getRootDir(),'storage/public/invoice', pdfName);
                        fs.writeFileSync(filePath, pdfBuffer);
                    } catch (pdfError) {
                        console.error("Error generating PDF:", pdfError);
                    } finally {
                        await browser.close();
                    }
                }
            );

            return res.redirect(`/admin${res.locals.adminRoutes.invoiceList}`);

        }
        catch(err){
            console.log(err);
            await trans.rollback();
            return next(err);
        }
    }

    delete=async(req,res,next)=>{
        await Invoice.destroy({where:{id:req.params.invoiceId}});
        return res.redirect(`/admin${res.locals.adminRoutes.invoiceList}`);
    }

    // generateInvoice=async(req,res,next)=>{
    //     try {
    //         // Define the HTML content for the invoice

    //         let invoice=await Invoice.findOne({where:{id:req.params.invoiceId},include:'items'});

    //         res.render('admin/invoice/invoice',{
    //             items:invoice.items,
    //             subTotal:invoice.subTotal,
    //             sgst:invoice.sgst,
    //             cgst:invoice.cgst,
    //             discount:invoice.discount,
    //             total:invoice.total
    //         },async(err,html)=>{
    //             if(err){
    //                 throw err;
    //             }

    //             // Launch Puppeteer
    //             const browser = await puppeteer.launch();
    //             const page = await browser.newPage();
            
    //             // Set the HTML content
    //             await page.setContent(html);
            
    //             // Generate PDF
    //             const pdfBuffer = await page.pdf({ format: 'A4' });
            
    //             // Close the browser
    //             await browser.close();
            
    //             // Set response headers and send the PDF file
    //             res.set({
    //             'Content-Type': 'application/pdf',
    //             'Content-Disposition': 'attachment; filename=invoice.pdf',
    //             });
    //             return res.send(pdfBuffer);

    //         }); 
        
    //       } catch (error) {
    //         return res.status(500).send('Error generating PDF');
    //       }
    // }

    generateInvoice = async (req, res, next) => {
        try {
            // Retrieve invoice data
            let invoice = await Invoice.findOne({
                where: { id: req.params.invoiceId },
                include: 'items'
            });
    
            // Render the HTML content from the EJS template
            res.render(
                'admin/invoice/invoice',
                {
                    items: invoice.items??[],
                    subTotal: invoice.subTotal,
                    sgst: invoice.sgst,
                    cgst: invoice.cgst,
                    discount: invoice.discount,
                    total: invoice.total
                },
                async (err, html) => {
                    if (err) {
                        return next(err);
                    }

                    const browser = await puppeteer.launch({
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    });
    
                    try {
                        const page = await browser.newPage();
                        await page.setContent(html);
                        const pdfBuffer = await page.pdf({ format: 'A4',printBackground: true });
                        let pdfName=`${invoice.mobile}-${invoice.shopName??'invoice'}-${parseInt(invoice.id)}.pdf`;
                        let filePath=path.resolve(getRootDir(),'storage/public/invoice', pdfName);
                        fs.writeFileSync(filePath, pdfBuffer);
                    } catch (pdfError) {
                        console.error("Error generating PDF:", pdfError);
                    } finally {
                        await browser.close();
                    }
                }
            );
        } catch (error) {
            console.error("Error fetching invoice:", error);
            return res.status(500).send('Error generating PDF');
        }
    }

    pdfViewer=async(req,res,next)=>{
        let invoice = await Invoice.findOne({
            where: { id: req.params.invoiceId },
            include: 'items'
        });
        let pdfName=`${invoice.mobile}-${invoice.shopName??'invoice'}-${parseInt(invoice.id)}.pdf`;
        return res.render('admin/invoice/pdf-viewer',{
            url:'/storage/invoice/'+pdfName,
            pageTitle:'Invoice PDF',
            invoiceId:invoice.id
        });
    }

    downloadFile=async(req,res,next)=>{
        let invoice = await Invoice.findOne({
            where: { id: req.params.invoiceId },
            include: 'items'
        });
        let pdfName=`${invoice.mobile}-${invoice.shopName??'invoice'}-${parseInt(invoice.id)}.pdf`;
        let filePath=path.join(__dirname,'../../public/storage/invoice/',pdfName);
        return res.download(filePath, pdfName, (err) => {
            if (err) {
                console.error('File download error:', err);
                return res.status(500).send('Error downloading file.');
            }
        });
    }
}

module.exports=InvoiceController;