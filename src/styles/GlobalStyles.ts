import { createGlobalStyle } from 'styled-components';
import { range } from 'lodash';

const shorthandSpacing = range(0, 150, 5).map(n => {
  return `
  .m${n}{ margin: ${n}px; }
  .mt${n}{ margin-top: ${n}px; }
  .mb${n}{ margin-bottom: ${n}px; }
  .ml${n}{ margin-left: ${n}px; }
  .mr${n}{ margin-right: ${n}px; }
  .mx${n}{ margin-right: ${n}px;  margin-left: ${n}px; }
  .my${n}{ margin-top: ${n}px;  margin-bottom: ${n}px; }
  .p${n}{ padding: ${n}px; }
  .pt${n}{ padding-top: ${n}px; }
  .pb${n}{ padding-bottom: ${n}px; }
  .pl${n}{ padding-left: ${n}px; }
  .pr${n}{ padding-right: ${n}px; }
  .px${n}{ padding-right: ${n}px;  padding-left: ${n}px; }
  .py${n}{ padding-top: ${n}px;  padding-bottom: ${n}px; }
  `;
});

const shorthandClasses = `
  .relative { position: relative  }
  .flex { display: flex  }
  .flex-row { flex-direction: row  }
  .flex-wrap { flex-wrap: wrap  }
  .flex-column { flex-direction: column  }
  .space-between { justify-content: space-between  }
  .space-evenly { justify-content: space-evenly  }
  .center { justify-content: center  }
  .start { justify-content: flex-start  }
  .rm-double-border { margin-top: -2px  }
  .m-auto { margin: auto }
  .dont-break-out {
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
  }
  .align-flex-end { align-items: flex-end; }
`;

const transitionClasses = `
 
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}`;

export const GlobalStyles = createGlobalStyle`
  ${shorthandSpacing}
  ${shorthandClasses}
  ${transitionClasses}
`;
