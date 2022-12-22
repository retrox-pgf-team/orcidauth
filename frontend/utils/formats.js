import crypto from "crypto";
const ethereumAddressRegex = new RegExp(/^0x[0-9a-f]{40}$/);

export const isValidEthereumAddress = (address) => {
  return ethereumAddressRegex.test(address);
};

const orcidRegex = new RegExp(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X]$/);

export const isValidOrcid = (orcid) => {
  return orcidRegex.test(orcid);
};

export function generateColorFromOrcid(orcid) {
  // Generate a hash of the ORCID
  const hash = crypto.createHash("sha256").update(orcid).digest("hex");

  // Convert the hash to a number in the range 0-16777215 (the range of RGB colors)
  const colorValue = parseInt(hash.slice(0, 6), 16) % 16777216;

  // Convert the color value to a 6-digit hex string
  const colorString = colorValue.toString(16).padStart(6, "0");

  // Return the color string as a CSS color code
  return `#${colorString}`;
}
