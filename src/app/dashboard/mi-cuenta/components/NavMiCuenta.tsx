interface Props {
  navSelect: number;
  setNavSelect: (open: number) => void;
}

export default function NavMiCuenta({ navSelect, setNavSelect }: Props) {
  console.log(navSelect);

  const navs = [
    {
      id: 1,
      title: "Detalles",
    },
    {
      id: 2,
      title: "Descargas",
    },
    {
      id: 3,
      title: "Notificaciones",
    },
    {
      id: 4,
      title: "Membresía",
    },
  ];
  return (
    <section className="flex gap-2">
      {navs.map((nav) => (
        <button
          key={nav.id}
          onClick={() => {
            setNavSelect(nav.id);
          }}
        >
          {nav.title}
        </button>
      ))}
    </section>
  );
}
