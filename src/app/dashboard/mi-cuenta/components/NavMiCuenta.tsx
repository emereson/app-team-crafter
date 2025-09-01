interface Props {
  navSelect: number;
  setNavSelect: (open: number) => void;
}

export default function NavMiCuenta({ navSelect, setNavSelect }: Props) {
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
    <section className=" m-auto flex gap-1">
      {navs.map((nav) => (
        <button
          key={nav.id}
          className={`${
            navSelect === nav.id
              ? "bg-[#FC68B9] text-[#FFFFFF]"
              : "bg-[#FFE1F2] text-[#FC68B9]"
          } px-6 py-2 rounded-full text-lg font-bold cursor-pointer`}
          onClick={() => {
            setNavSelect(nav.id);
          }}
        >
          {nav.title}
        </button>
      ))}
      <button className="bg-white text-[#FC68B9] border-1 border-[#FC68B9] px-6 py-2 rounded-full text-lg font-bold cursor-pointer">
        Cerrar sesión
      </button>
    </section>
  );
}
