export default function MenuItemsAPI() {
  const menuItems = [
    {
      id: "PageStart",
      label: "_START_PAGE_",
      to: {
        name: "PageStart",
      },
      icon: "House",
    },
    {
      id: "PageScripts",
      label: "_SCRIPTS_PAGE_",
      icon: "FiletypeJs",
      children: [
        {
          id: "PageHeadings",
          label: "_HEADINGS_PAGE_",
          to: {
            name: "PageHeadings",
          },
        },
      ],
    },

  ];

  return {
    menuItems,
  };
}
