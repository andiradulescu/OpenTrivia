pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';

contract BlockTriviaToken is ERC20Mintable {
  string public name = "BlockTrivia Token";
  string public symbol = "BTV";
  uint8 public decimals = 18;
}
