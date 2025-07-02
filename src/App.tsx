import { useState, useEffect } from "react";
import { Layout, Menu, Carousel, Typography, Alert, Table } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import axios from "axios";

const { Title } = Typography;

const imgStyle: React.CSSProperties = {
  width: "100%",
  maxHeight: "300px",
  objectFit: "cover",
};

interface PostType {
  _id: string;
  titulo: string;
  categoria: string;
  contenido: string;
}

export default function App() {
  const [postsData, setPostsData] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://nestjs-blog-backend-api.desarrollo-software.xyz/posts`
      );
      const items = response.data.data.items || response.data.data || [];
      const posts = items.map((post: any) => ({
        _id: post._id,
        titulo: post.nombre || post.titulo || "Sin título",
        categoria: post.categoria || "Sin categoría",
        contenido: post.contenido || "Sin contenido",
      }));
      setPostsData(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPostsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMenuKey === "2") {
      fetchPosts();
    }
  }, [selectedMenuKey]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Categoría",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "Contenido",
      dataIndex: "contenido",
      key: "contenido",
      ellipsis: true,
      width: 300,
    },
  ];

  const menuItems = [
    { key: "1", label: "Home" },
    { key: "2", label: "Listado" },
    { key: "3", label: "Crear" },
    { key: "4", label: "Estadísticas" },
    { key: "5", label: "Información" },
  ];

  const onMenuClick = (e: { key: string }) => {
    setSelectedMenuKey(e.key);
  };

  return (
    <Layout>
      <Header style={{ background: "#001529", padding: 0 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedMenuKey]}
          items={menuItems}
          onClick={onMenuClick}
        />
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          {selectedMenuKey === "1" && (
            <>
              <Title>Bienvenidos al Módulo de Post</Title>

              <div style={{ maxWidth: "90vw", width: "100%", margin: "0 auto" }}>
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

              <br />

              <Alert message="Recuerda: Cada post debe tener título y contenido." type="warning" />
            </>
          )}

          {selectedMenuKey === "2" && (
            <>
              <Title level={3}>Listado de Posts</Title>
              <Table
                rowKey="_id"
                columns={columns}
                dataSource={postsData}
                loading={loading}
                pagination={false}
              />
            </>
          )}

          {selectedMenuKey !== "1" && selectedMenuKey !== "2" && (
            <Title level={3}>
              Contenido para "{menuItems.find((i) => i.key === selectedMenuKey)?.label}"
            </Title>
          )}
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Portal de Cursos ©2025 Creado por Tu Nombre
      </Footer>
    </Layout>
  );
}
