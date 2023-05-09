import { ethers } from "ethers";

/**
 * Encodes the parameters for the RoundFactory.create() function.
 *
 * @param params
 * @returns {string}
 */
export const encodeRoundParameters = (params: any[]): string => {
    return ethers.utils.defaultAbiCoder.encode(
      [
        "tuple(uint256 applicationsStartTime, uint256 applicationsEndTime, uint256 roundStartTime, uint256 roundEndTime)",
        "address",
        "address",
        "address",
        "uint256",
        "tuple(tuple(uint256 protocol, string pointer), tuple(uint256 protocol, string pointer))",
        "tuple(address[] adminRoles, address[] roundOperators)"
      ],
      params
    );
  }