declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare interface Recipient {
  email: string;
  isSelected: boolean;
}

declare type RecipientsGroup = [string, Recipient[]];
