import { createGlobalStyle } from "styled-components";
import { range } from "lodash";

const shorthandSpacing = range(400).map((_, i) => {
  return `
  .m${i}{ margin: ${i}px; }
  .mt${i}{ margin-top: ${i}px; }
  .mb${i}{ margin-bottom: ${i}px; }
  .ml${i}{ margin-left: ${i}px; }
  .mr${i}{ margin-right: ${i}px; }
  .mx${i}{ margin-right: ${i}px;  margin-left: ${i}px; }
  .my${i}{ margin-top: ${i}px;  margin-bottom: ${i}px; }
  .p${i}{ padding: ${i}px; }
  .pt${i}{ padding-top: ${i}px; }
  .pb${i}{ padding-bottom: ${i}px; }
  .pl${i}{ padding-left: ${i}px; }
  .pr${i}{ padding-right: ${i}px; }
  .px${i}{ padding-right: ${i}px;  padding-left: ${i}px; }
  .py${i}{ padding-top: ${i}px;  padding-bottom: ${i}px; }
  `;
});

const shorthandRemSpacing = range(13).map((_, i) => {
  return `
  .m-${i}{ margin: ${i}rem; }
  .m-t-${i}{ margin-top: ${i}rem; }
  .m-b-${i}{ margin-bottom: ${i}rem; }
  .m-l-${i}{ margin-left: ${i}rem; }
  .m-r-${i}{ margin-right: ${i}rem; }
  .m-x-${i}{ margin-right: ${i}rem;  margin-left: ${i}rem; }
  .m-y-${i}{ margin-top: ${i}rem;  margin-bottom: ${i}rem; }
  .p-${i}{ padding: ${i}rem; }
  .p-t-${i}{ padding-top: ${i}rem; }
  .p-b-${i}{ padding-bottom: ${i}rem; }
  .p-l-${i}{ padding-left: ${i}rem; }
  .p-r-${i}{ padding-right: ${i}rem; }
  .p-x-${i}{ padding-right: ${i}rem;  padding-left: ${i}rem; }
  .p-y-${i}{ padding-top: ${i}rem;  padding-bottom: ${i}rem; }
  `;
});

const shorthandClasses = `
  .relative { position: relative  }
  .flex { display: flex  }
  .flex-row { flex-direction: row  }
  .flex-column { flex-direction: column  }
  .space-between { justify-content: space-between  }
  .center { justify-content: center  }
  .start { justify-content: flex-start  }
  .rm-double-border { margin-top: -2px  }
  .m-auto { margin: auto }
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
  ${shorthandRemSpacing}
  ${shorthandClasses}
  ${transitionClasses}
`;
