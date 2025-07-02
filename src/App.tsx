import { useState, useEffect } from "react";
import { Layout, Menu, Carousel, Calendar, Table, Typography, Button, Image } from "antd";
import { Link } from "react-router-dom";
import { Header, Content, Footer } from "antd/es/layout/layout";
import axios from "axios";

const { Title } = Typography;

export default function App() {
  const [coursesData, setCoursesData] = useState<any[]>([]);

  useEffect(() => {
    // Obtener cursos de la API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://nestjs-blog-backend-api.desarrollo-software.xyz/cursos/"
        );
        setCoursesData(response.data.data.items); // Asume que los datos están dentro de 'data.items'
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
    { title: "Acciones", render: (record: any) => (
      <Button type="primary">
        <Link to={`/course/${record._id}`}>Más Información</Link>
      </Button>
    )}
  ];

  const menuItems = [
    { key: "1", label: "Home" },
    { key: "2", label: "Cursos" }
  ];

  return (
    <Layout>
      {/* Encabezado */}
      <Header style={{ background: "#001529", padding: 0 }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} items={menuItems} />
      </Header>

      {/* Cuerpo */}
      <Content style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <Title>Bienvenidos al Portal de Cursos</Title>
          <Carousel autoplay>
            <div>
              <img src="https://www.bridgestone.com.co/content/dam/consumer/bst/la/co/tips/2022/tecnologia-de-llantas/deportivo.jpg" alt="Imagen 1" style={{ width: "100%" }} />
            </div>
            <div>
              <img src="https://www.bridgestone.com.co/content/dam/consumer/bst/la/co/tips/2022/tecnologia-de-llantas/deportivo.jpg" alt="Imagen 2" style={{ width: "100%" }} />
            </div>
            <div>
              <img src="https://www.bridgestone.com.co/content/dam/consumer/bst/la/co/tips/2022/tecnologia-de-llantas/deportivo.jpg" alt="Imagen 3" style={{ width: "100%" }} />
            </div>
          </Carousel>

          <Calendar style={{ margin: "20px 0" }} />

          <Image
            width={200}
            src="https://via.placeholder.com/200"
            alt="Imagen de ejemplo"
          />

          <Title level={4}>Cursos Disponibles</Title>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={coursesData}
            pagination={false}
          />
        </div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        Portal de Cursos ©2025 Creado por Tu Nombre
      </Footer>
    </Layout>
  );
}
