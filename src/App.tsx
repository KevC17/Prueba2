import { useState, useEffect } from "react";
import { Layout, Menu, Carousel, Typography, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import { Header, Content, Footer } from "antd/es/layout/layout";
import axios from "axios";

const { Title } = Typography;

// Estilo para las imágenes del carrusel
const imgStyle: React.CSSProperties = {
  width: '100%',
  maxHeight: '300px',
  objectFit: 'cover',
};

export default function App() {
  const [coursesData, setCoursesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://nestjs-blog-backend-api.desarrollo-software.xyz/cursos/"
        );
        setCoursesData(response.data.data.items);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const columns = [
    { title: "Nombre", dataIndex: "nombre" },
    { title: "Categoría", dataIndex: "categoria" },
    { title: "Precio", dataIndex: "precio" },
    {
      title: "Acciones",
      render: (record: any) => (
        <Button type="primary">
          <Link to={`/course/${record._id}`}>Más Información</Link>
        </Button>
      ),
    },
  ];

  const menuItems = [
    { key: "1", label: "Home" },
    { key: "2", label: "Listado" },
    { key: "3", label: "Crear" },
    { key: "4", label: "Estadisticas" },
    { key: "5", label: "Informacion" },
  ];

  return (
    <Layout>
      <Header style={{ background: "#001529", padding: 0 }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} items={menuItems} />
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <Title>Bienvenidos al Modulo de Post</Title>

          {/* Contenedor adaptable y centrado */}
          <div style={{ maxWidth: '90vw', width: '100%', margin: '0 auto' }}>
            <Carousel arrows infinite={false}>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzV8QzZ0dmMcfPPBOmYGr0giKHbnCft-a_tveLDUfAs8DGRPKqbMCaxOq4XGVkkjuCqyU&usqp=CAU"
                  alt="Slide 1"
                  style={imgStyle}
                />
              </div>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzV8QzZ0dmMcfPPBOmYGr0giKHbnCft-a_tveLDUfAs8DGRPKqbMCaxOq4XGVkkjuCqyU&usqp=CAU"
                  alt="Slide 2"
                  style={imgStyle}
                />
              </div>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzV8QzZ0dmMcfPPBOmYGr0giKHbnCft-a_tveLDUfAs8DGRPKqbMCaxOq4XGVkkjuCqyU&usqp=CAU"
                  alt="Slide 3"
                  style={imgStyle}
                />
              </div>
            </Carousel>
          </div>
          <Alert message="Recuerda: Cada post debe tener título y contenido." type="warning"/>
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Portal de Cursos ©2025 Creado por Tu Nombre
      </Footer>
    </Layout>
  );
}
