import { Action, ActionTypes, KeyFileInterface } from '../actions';

const tempState = [
  {
    pubkey:
      '98277f37ef19a72048a17ecc344a9d8bdf96a3e4411ae5845e7ff32291ee163ca3c825c68b3567a07fbaa2370dc1f4b6',
    withdrawal_credentials:
      '168540325a35a09c78fde7cdcfd2f3a190cff2e2571c6779eb96027bd31d4399',
    amount: 32000000000,
    signature:
      '943400bd9a0f61e6540eeae8b1e05e29c4718bc51d29f827372be948f002c3cfd8acad77fb077eee898c175d651cdc5d14847d1c0d48c8d95cf27a4c8428225a5f795528a0301c468d3f7bee5826c48dc39d38ef9c41c58c51ca2e19b9687641',
    deposit_data_root:
      '4aa8b452b650b51140b867e84ccbb344afefaac97859649c38c374345e43e0ed',
    signed_deposit_data_root:
      '7be5994756c5a1d3ec499b07de6c63a03a4901d9bf91db960a9295fd7d026c6f',
  },
  {
    pubkey:
      '82fbaf0ea3e20065d987e6f25b50ee24fb0cdb1189e79947437a5faf2f16c59e3923e0f0e42ba5ee327ead510eaef9ac',
    withdrawal_credentials:
      'e86e82ae490777e1bba17db34c9651fe6c842f72668824ee0fbbb02468f73a84',
    amount: 32000000000,
    signature:
      'b979e8923a314ee934c1ed4561a6252301061852c53daf18101d4637dd059e205dcfdb5ec3b530262a4176db7646d62c0f087c53480ceebcdf33274851f1d45d7e6d6b6aae2dffc794e57431798ec6677c28ccc46aadac20c9aba16dd32e5973',
    deposit_data_root:
      'c389c2a853d7c40a8461c26ddfc5dc90e1d67c13418f4e0deb118386e241d856',
    signed_deposit_data_root:
      'b9e413e1d4e1310fbc79a2039af7a6c5ffecb6e7222568abe942b9b0dfff5355',
  },
  {
    pubkey:
      'a2b03be7949105c9a3a2eea2c5ff35e8d1d4dbec3338b7c6983e2bf4c5f0e1676c5620143f829a05a69af8366c2a5295',
    withdrawal_credentials:
      '29b25593697f0238582985a4481684c842fa3439c71219b385b28956cffe8cd6',
    amount: 32000000000,
    signature:
      '8a384b2b5f7107518ef880d0ca170fc703a0a91e4259de047540c38e836298bf97289740e8d9593bee746437cb5f955217316028d909acf7fa07277c46b92b35c5c847aef0770085676cce8451d02166036ed7108a43af9607304240e6091221',
    deposit_data_root:
      'deb169a39cd6aa5a7ce2809ade0061dacd275e20f317c47643fd1d79f916154a',
    signed_deposit_data_root:
      '1048587c4f2a7e5c48e24473394d9721d265b8de5ee42ea9db3b4ddb74da6c26',
  },
];

export const keyFilesReducer = (
  state: KeyFileInterface[] = tempState,
  action: Action
) => {
  if (action.type === ActionTypes.updateKeyFiles) {
    return action.payload;
  }
  if (action.type === ActionTypes.updateTransactionStatus) {
    return state;
  }
  return state;
};
