import { useIntl } from 'react-intl';
import {
  IS_MAINNET,
  EL_TESTNET_NAME,
  TESTNET_LAUNCHPAD_NAME,
} from '../utils/envVars';

const useIntlNetworkName = (): {
  executionLayerName: string;
  consensusLayerName: string;
} => {
  const { formatMessage } = useIntl();
  const executionLayerName: string = IS_MAINNET
    ? formatMessage({ defaultMessage: 'Mainnet' })
    : formatMessage(
        { defaultMessage: '{EL_TESTNET_NAME} testnet' },
        { EL_TESTNET_NAME }
      );
  const consensusLayerName: string = IS_MAINNET
    ? formatMessage({ defaultMessage: 'Mainnet' })
    : formatMessage(
        { defaultMessage: '{TESTNET_LAUNCHPAD_NAME} testnet' },
        { TESTNET_LAUNCHPAD_NAME }
      );
  return { executionLayerName, consensusLayerName };
};

export default useIntlNetworkName;
