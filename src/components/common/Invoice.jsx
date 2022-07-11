import jsPDFInvoiceTemplate from "jspdf-invoice-template";

export default function Invoice(
  name,
  address,
  phone,
  inputFields,
  date,
  grandTotal,
  restaurantBillAmount,
  accomodationTotal,
  roomDetails,
  extraBedTotal
) {
  if (restaurantBillAmount) {
    inputFields.items.splice(0, 0, {itemName: "Restaurant Bill", itemPrice: restaurantBillAmount});
  }
  if (extraBedTotal) {
    inputFields.items.splice(0, 0, {itemName: "Extra Bed Cost", itemPrice: extraBedTotal});
  }
  inputFields.items.splice(0, 0, {itemName: "Accomodation Total", itemPrice: accomodationTotal});

  var props = {
    returnJsPDFDocObject: true,
    fileName: "Invoice",
    orientationLandscape: false,
    logo: {
      src: "/adithyalogo.png",
      width: 53.33,
      height: 26.66,
      margin: {
        top: 0,
        left: 0,
      },
    },
    business: {
      name: "Hotel Adithya Group",
      address: "Bangalore Road, Dharmastala",
      phone: "9874563210",
      email: "info@adithyahotel.com",
      website: "hoteladithya.com",
    },
    contact: {
      label: "Invoice issued for:",
      name: name,
      address: address,
      phone: phone,
    },
    invoice: {
      label: "Invoice #: ",
      num: Math.floor(Math.random()*1000),
      invDate: `CheckIn Date: ${date}`,
      invGenDate: `CheckOut Date: ${date}`,
      headerBorder: false,
      tableBodyBorder: false,
      header: ["#", "Title", "Amount"],
      table: inputFields?.items.map((data, index) => [(index += 1), data.itemName, data.itemPrice]),
      invTotalLabel: "Total:",
      invTotal: `${grandTotal}`,
      invCurrency: "ALL",
      invDescLabel: "Room Details",
      invDesc: `${roomDetails?.map(details => [
        "Room Number - ",
        details.roomNumber,
        " Room Type -",
        details.roomType,
        " Room Boy - ",
        details.roomBoy,
        " Adults - ",
        details.adults,
        " Children - ",
        details.children,
      ])}`,
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  jsPDFInvoiceTemplate(props);
}
