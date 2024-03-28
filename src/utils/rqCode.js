import qrcode from "qrcode";
export const generateQR = async (data) => {
  const qr = await qrcode.toDataURL(JSON.stringify(data));
  return qr;
};
