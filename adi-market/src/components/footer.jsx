function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-1 fw-semibold">
          ADI Market
        </p>

        <p className="mb-1">
          Automated Dispatch Interface
        </p>

        <small className="text-white-50">
          © {anioActual} ADI Market. Proyecto desarrollado por Ignacio Guajardo.
        </small>
      </div>
    </footer>
  );
}

export default Footer;