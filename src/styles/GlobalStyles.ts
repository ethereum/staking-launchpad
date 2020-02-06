import { createGlobalStyle } from "styled-components";
import { range } from "lodash";

const shorthandSpacing = range(51).map((_, i) => {
  return `
  .m${i}{ margin: ${i}px !important;}
  .mt${i}{ margin-top: ${i}px !important;}
  .mb${i}{ margin-bottom: ${i}px !important;}
  .ml${i}{ margin-left: ${i}px !important;}
  .mr${i}{ margin-right: ${i}px !important;}
  .mx${i}{ margin-right: ${i}px !important; margin-left: ${i}px !important;}
  .my${i}{ margin-top: ${i}px !important; margin-bottom: ${i}px !important;}
  .p${i}{ padding: ${i}px !important;}
  .pt${i}{ padding-top: ${i}px !important;}
  .pb${i}{ padding-bottom: ${i}px !important;}
  .pl${i}{ padding-left: ${i}px !important;}
  .pr${i}{ padding-right: ${i}px !important;}
  .px${i}{ padding-right: ${i}px !important; padding-left: ${i}px !important;}
  .py${i}{ padding-top: ${i}px !important; padding-bottom: ${i}px !important;}
  `;
});

const shorthandRemSpacing = range(13).map((_, i) => {
  return `
  .m-${i}{ margin: ${i}rem !important;}
  .m-t-${i}{ margin-top: ${i}rem !important;}
  .m-b-${i}{ margin-bottom: ${i}rem !important;}
  .m-l-${i}{ margin-left: ${i}rem !important;}
  .m-r-${i}{ margin-right: ${i}rem !important;}
  .m-x-${i}{ margin-right: ${i}rem !important; margin-left: ${i}rem !important;}
  .m-y-${i}{ margin-top: ${i}rem !important; margin-bottom: ${i}rem !important;}
  .p-${i}{ padding: ${i}rem !important;}
  .p-t-${i}{ padding-top: ${i}rem !important;}
  .p-b-${i}{ padding-bottom: ${i}rem !important;}
  .p-l-${i}{ padding-left: ${i}rem !important;}
  .p-r-${i}{ padding-right: ${i}rem !important;}
  .p-x-${i}{ padding-right: ${i}rem !important; padding-left: ${i}rem !important;}
  .p-y-${i}{ padding-top: ${i}rem !important; padding-bottom: ${i}rem !important;}
  `;
});

const shorthandClasses = `
  .flex { display: flex !important }
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
