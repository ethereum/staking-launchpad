import { useEffect, useState } from 'react';
import { TransactionStatus } from '../components/TransactionStatusModal';

let modalCount = 0;

export const useTxModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTx, setShowTx] = useState(false);
  const [txStatus, setTxStatus] = useState<TransactionStatus>('not_started');
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    if (showModal || showTx) {
      modalCount += 1;
      if (modalCount === 1) {
        document.body.style.overflow = 'hidden';
        document.body.style.pointerEvents = 'none';
        document.body.setAttribute('aria-hidden', 'true');
        const root = document.getElementById('root');
        if (root) {
          root.setAttribute('aria-hidden', 'true');
        }
      }
    } else {
      modalCount -= 1;
      if (modalCount === 0) {
        document.body.style.overflow = '';
        document.body.style.pointerEvents = '';
        document.body.removeAttribute('aria-hidden');
        const root = document.getElementById('root');
        if (root) {
          root.removeAttribute('aria-hidden');
        }
      }
    }
    return () => {
      modalCount -= 1;
      if (modalCount === 0) {
        document.body.style.overflow = '';
        document.body.style.pointerEvents = '';
        document.body.removeAttribute('aria-hidden');
        const root = document.getElementById('root');
        if (root) {
          root.removeAttribute('aria-hidden');
        }
      }
    };
  }, [showModal, showTx]);

  const resetTxModal = () => {
    setShowTx(false);
    setShowModal(false);
    setTxHash('');
    setTxStatus('not_started');
  };

  return {
    resetTxModal,
    setShowModal,
    setShowTx,
    setTxHash,
    setTxStatus,
    showModal,
    showTx,
    txHash,
    txStatus,
  };
};
