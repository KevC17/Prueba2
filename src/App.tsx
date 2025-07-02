import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Carousel,
  Typography,
  Alert,
  Table,
  Form,
  Input,
  Button,
  Select,
  message,
} from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

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

  const [form] = Form.useForm();
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [creating, setCreating] = useState(false);

  const [longTitleLength, setLongTitleLength] = useState<number>(0);
  const [countLongTitles, setCountLongTitles] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);
  const [totalTitleChars, setTotalTitleChars] = useState<number>(0);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://nestjs-blog-backend-api.desarrollo-software.xyz/posts");
      const items = response.data.data.items || [];
      const posts = items.map((post: any) => ({
        _id: post.id,
        titulo: post.title || "Sin título",
        categoria: post.category?.name || "Sin categoría",
        contenido: post.content || "Sin contenido",
      }));
      setPostsData(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPostsData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://nestjs-blog-backend-api.desarrollo-software.xyz/categories");
      const catOptions = response.data.data?.map((cat: any) => ({
        label: cat.name,
        value: cat.id,
      })) || [];
      setCategories(catOptions);
    } catch (error) {
      console.error("Error al cargar categorías", error);
      setCategories([]);
    }
  };

  const createPost = async (values: any) => {
    setCreating(true);
    try {
      await axios.post("https://nestjs-blog-backend-api.desarrollo-software.xyz/posts", {
        title: values.title,
        content: values.content,
        categoryId: values.categoryId,
      });
      message.success("Post creado exitosamente");
      form.resetFields();
    } catch (error) {
      console.error("Error al crear post:", error);
      message.error("No se pudo crear el post");
    } finally {
      setCreating(false);
    }
  };

  const handleCountLongTitles = () => {
    const count = postsData.filter((post) => post.titulo.length >= longTitleLength).length;
    setCountLongTitles(count);
  };

  const handleCalculatePercentage = () => {
    const total = postsData.length;
    if (!selectedCategory || total === 0) {
      setPercentage(0);
      return;
    }
    const catName = getCategoryNameById(selectedCategory);
    const count = postsData.filter((post) => post.categoria === catName).length;
    const result = ((count / total) * 100).toFixed(2);
    setPercentage(Number(result));
  };

  const handleTotalCharsInTitles = () => {
    const total = postsData.reduce((sum, post) => sum + post.titulo.length, 0);
    setTotalTitleChars(total);
  };

  const getCategoryNameById = (id: string) => {
    const found = categories.find((cat) => cat.value === id);
    return found ? found.label : "";
  };

  useEffect(() => {
    if (selectedMenuKey === "2" || selectedMenuKey === "4") {
      fetchPosts();
    }
    if (selectedMenuKey === "3" || selectedMenuKey === "4") {
      fetchCategories();
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
                  {[1, 2, 3].map((_, i) => (
                    <div key={i}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzV8QzZ0dmMcfPPBOmYGr0giKHbnCft-a_tveLDUfAs8DGRPKqbMCaxOq4XGVkkjuCqyU&usqp=CAU"
                        alt={`Slide ${i + 1}`}
                        style={imgStyle}
                      />
                    </div>
                  ))}
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

          {selectedMenuKey === "3" && (
            <>
              <Title level={3}>Crear Nuevo Post</Title>
              <Form layout="vertical" form={form} onFinish={createPost} style={{ maxWidth: 600 }}>
                <Form.Item
                  label="Título"
                  name="title"
                  rules={[{ required: true, message: "Por favor ingresa el título" }]}
                >
                  <Input placeholder="Título del post" />
                </Form.Item>
                <Form.Item
                  label="Contenido"
                  name="content"
                  rules={[{ required: true, message: "Por favor ingresa el contenido" }]}
                >
                  <TextArea rows={4} placeholder="Contenido del post" />
                </Form.Item>
                <Form.Item
                  label="Categoría"
                  name="categoryId"
                  rules={[{ required: true, message: "Selecciona una categoría" }]}
                >
                  <Select
                    placeholder="Selecciona una categoría"
                    options={categories}
                    loading={categories.length === 0}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={creating}>
                    Crear Post
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}

          {selectedMenuKey === "4" && (
            <>
              <Title level={3}>Estadísticas de Publicaciones</Title>

              <div style={{ marginBottom: 24 }}>
                <Title level={4}>1. Contar Posts con Títulos Largos</Title>
                <Input
                  type="number"
                  placeholder="Longitud mínima de título"
                  value={longTitleLength}
                  onChange={(e) => setLongTitleLength(Number(e.target.value))}
                  style={{ width: 300, marginBottom: 8 }}
                />
                <br />
                <Button onClick={handleCountLongTitles} type="primary">
                  Calcular
                </Button>
                <p>Total de posts con título ≥ {longTitleLength} caracteres: {countLongTitles}</p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <Title level={4}>2. Porcentaje de Posts por Categoría</Title>
                <Select
                  options={categories}
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value)}
                  placeholder="Selecciona una categoría"
                  style={{ width: 300, marginBottom: 8 }}
                />
                <br />
                <Button onClick={handleCalculatePercentage} type="primary" style={{ background: "#13c2c2" }}>
                  Calcular Porcentaje
                </Button>
                <p>Porcentaje de "{getCategoryNameById(selectedCategory)}": {percentage}%</p>
              </div>

              <div>
                <Title level={4}>3. Total de Caracteres en Títulos</Title>
                <Button onClick={handleTotalCharsInTitles} type="primary" style={{ background: "#52c41a" }}>
                  Calcular Total de Caracteres
                </Button>
                <p>Total de caracteres en todos los títulos: {totalTitleChars}</p>
              </div>
            </>
          )}
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Portal de Cursos ©2025 Creado por Tu Nombre
      </Footer>
    </Layout>
  );
}
