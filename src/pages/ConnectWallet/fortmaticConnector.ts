/*
  This class is from NoahZinsmeisters web3-react library with edits to allow Goerli testnet
  https://github.com/NoahZinsmeister/web3-react/blob/v6/packages/fortmatic-connector/src/index.ts
 */

import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
import invariant from 'tiny-invariant';

const chainIdToNetwork: { [network: number]: string } = {
  1: 'mainnet',
  5: 'goerli',
};

interface FortmaticConnectorArguments {
  apiKey: string;
  chainId: number;
  rpcUrl: string;
}

export class FortmaticConnector extends AbstractConnector {
  private readonly apiKey: string;

  private readonly chainId: number;

  private readonly rpcUrl: string;

  public fortmatic: any;

  constructor({ apiKey, chainId, rpcUrl }: FortmaticConnectorArguments) {
    invariant(
      Object.keys(chainIdToNetwork).includes(chainId.toString()),
      `Unsupported chainId ${chainId}`
    );
    super({ supportedChainIds: [chainId] });

    this.apiKey = apiKey;
    this.chainId = chainId;
    this.rpcUrl = rpcUrl;
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.fortmatic) {
      // @ts-ignore
      const { default: Fortmatic } = await import('fortmatic');
      this.fortmatic = new Fortmatic(this.apiKey, {
        rpcUrl: this.rpcUrl,
        chainId: this.chainId,
      });
    }

    const account = await this.fortmatic
      .getProvider()
      .enable()
      .then((accounts: string[]): string => accounts[0]);

    return {
      provider: this.fortmatic.getProvider(),
      chainId: this.chainId,
      account,
    };
  }

  public async getProvider(): Promise<any> {
    return this.fortmatic.getProvider();
  }

  public async getChainId(): Promise<number | string> {
    return this.chainId;
  }

  public async getAccount(): Promise<null | string> {
    return this.fortmatic
      .getProvider()
      .send('eth_accounts')
      .then((accounts: string[]): string => accounts[0]);
  }

  public deactivate() {
    this.close();
  }

  public async close() {
    await this.fortmatic.user.logout();
    this.emitDeactivate();
  }
}
