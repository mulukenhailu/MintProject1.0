const { ItemUpdate } = require("../../utility/item/update/ItemUpdate");
const { updateSerial } = require("../../utility/item/update/updateSerialNumber");

async function generalUpdate(req, res) {

    let{ItemNumber,
        productPrice, 
        productdescription, 
        productmodel, 
        Newproductmodelnumber,
        Oldproductmodelnumber,
        productname, 
        productphoto, 
        productquantitynumber, 
        productsource, 
        productstandardtype, 
        productstatus}=req.body

    try {
        const data = await ItemUpdate(
            ItemNumber,
            productPrice, 
            productdescription, 
            productmodel, 
            Newproductmodelnumber,
            productname, 
            productphoto, 
            productquantitynumber, 
            productsource, 
            productstandardtype, 
            productstatus
            );

            console.log(Oldproductmodelnumber, Newproductmodelnumber, data.update_Item.returning[0].created_at)

            try {
                const Data2 = await updateSerial( Oldproductmodelnumber, Newproductmodelnumber, data.update_Item.returning[0].created_at);
                res.send(Data2)
            } catch (serialError) {
                console.log("Error While updating serial number:", serialError);
                res.status(501).send({ error: "Retry Again." });
            }

    } catch (itemUpdateError) {
        console.log("Error While processing ItemGeneral Update:", itemUpdateError);
        res.status(501).send({ error: "Retry Again." });
    }

}

module.exports = { generalUpdate };
