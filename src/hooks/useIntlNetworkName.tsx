import { useIntl } from 'react-intl';
import { IS_MAINNET, TESTNET_LAUNCHPAD_NAME } from '../utils/envVars';

const useIntlNetworkName = (): {
  executionLayerName: string;
  consensusLayerName: string;
} => {
  const { formatMessage } = useIntl();
  const mainnet = formatMessage({ defaultMessage: 'Mainnet' });
  const executionLayerName: string = IS_MAINNET
    ? mainnet
    : formatMessage(
        { defaultMessage: '{TESTNET_LAUNCHPAD_NAME} testnet' },
        { TESTNET_LAUNCHPAD_NAME }
      );
  const consensusLayerName: string = IS_MAINNET
    ? mainnet
    : formatMessage(
        { defaultMessage: '{TESTNET_LAUNCHPAD_NAME} testnet' },
        { TESTNET_LAUNCHPAD_NAME }
      );
  return { executionLayerName, consensusLayerName };
};

export default useIntlNetworkName;
