const shortenAddress = (address = '', num = 3): string =>
  `${address.substring(0, num + 2)}...${address.substring(
    address.length - num
  )}`;

export default shortenAddress;
