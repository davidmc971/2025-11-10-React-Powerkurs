// List Content

type Item = {
  id: string;
  text: string;
};

const items: Item[] = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
];

// React Components

export function ListItem(props: { item: Item }) {
  return <li>{props.item.text}</li>;
}

type ListProps = {
  items: Item[];
};

export function List(props: ListProps) {
  const listItems = props.items.map((item) => (
    <ListItem key={item.id} item={item} />
  ));

  return <ul>{listItems}</ul>;
}

export default function ListExample() {
  return (
    <div>
      { /* Titel des Tabs */ }
      <title>List Example askdbaskdjfksdfj</title>
      <h1>List Example</h1>
      <List items={items} />
    </div>
  );
}


// Teaser für später die Woche im Power-Kurs
// export function List2(props: ListProps) {
//   const listItems = useMemo(
//     () => props.items.map((item) => <ListItem key={item.id} item={item} />),
//     [props.items]
//   );

//   return <ul>{listItems}</ul>;
// }