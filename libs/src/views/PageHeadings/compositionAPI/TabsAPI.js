export default function TabsAPI() {
  const dataTabs = [
    {
      id: "tab_1",
      slotContent: "content1",
      label: "_TAB_HIGHLIGHT_",
    },
    {
      id: "tab_2",
      slotContent: "content2",
      label: "_TAB_STRUCTURE_",
    },
    {
      id: "tab_4",
      slotContent: "links",
      label: "_TAB_LINKS_",
    },
  ];

  return {
    dataTabs,
  };
}
