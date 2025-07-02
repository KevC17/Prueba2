import { useState, useEffect } from "react";
import { Layout, Menu, Carousel, Calendar, Table, Typography, Button, Image } from "antd";
import { Link } from "react-router-dom";
import { Header, Content, Footer } from "antd/es/layout/layout";
import axios from "axios";

const { Title } = Typography;

// 🔧 Carrusel más pequeño
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
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
    { key: "2", label: "Cursos" },
  ];

  return (
    <Layout>
      <Header style={{ background: "#001529", padding: 0 }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} items={menuItems} />
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <Title>Bienvenidos al Portal de Cursos</Title>

          {/* 🎯 Carrusel con altura moderada */}
          <Carousel arrows infinite={false}>
            <div><h3 style={contentStyle}>1</h3></div>
            <div><h3 style={contentStyle}>2</h3></div>
            <div><h3 style={contentStyle}>3</h3></div>
            <div><h3 style={contentStyle}>4</h3></div>
          </Carousel>
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Portal de Cursos ©2025 Creado por Tu Nombre
      </Footer>
    </Layout>
  );
}
