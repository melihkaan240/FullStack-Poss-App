import { Button, Form, Input, Modal, Table, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  setCategories,
  categories,
}) => {
  const [editingRow, setEditingRow] = useState({});
  const onFinish = (values) => {
    try {
      fetch(
        process.env.REACT_APP_SERVER_URL + "/api/categories/update-category",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, categoryID: editingRow._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      message.success("Kategori başarıyla güncellendi");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti");
      console.log(error);
    }
  };
  const deleteCategory = (id) => {
    if (window.confirm("Emin Misiniz?")) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category",
          {
            method: "Delete",
            body: JSON.stringify({ categoryID: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        message.success("Kategori başarıyla silindi");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti");
        console.log(error);
      }
    }
  };
  const columns = [
    {
      title: "Category title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <FormItem className="mb-0" name={"title"}>
              <Input defaultValue={record.title} />
            </FormItem>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              type={"link"}
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button type={"link"} htmlType="submit" className="text-gray-500">
              Kaydet
            </Button>
            <Button
              type={"link"}
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      open={isEditModalOpen}
      title={"Kategori İşlemleri"}
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
