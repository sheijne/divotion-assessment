interface IWidget {
  active: boolean;
  props: any;
}

interface IWidgets {
  [key: string]: IWidget;
}

interface IWishlist {
  [key: number]: number;
  count: number;
}
