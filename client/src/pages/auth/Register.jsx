import { Input, Form, Button, Carousel, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const onFinish = async (values) => {
    setloading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (res.status === 200) {
        message.success("Kayıt İşlemi Başarılı.");
        navigate("/login");
        setloading(false);
      }
    } catch (error) {
      message.error("Bir Şeyler Yanlış Gitti.");
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className=" xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">Logo</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Şifre Tekrar Boş Bırakılamaz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Şifreler Aynı Olmak Zorunda!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız var mı?&nbsp;
            <Link to="/login" className="text-blue-600">
              Şimdi Giriş Yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:m-1/2 md:flex hidden  bg-[#6c63ff]">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img={"/images/responsive.svg"}
                  title={"Responsive"}
                  desc={"Tüm Cihaz Boyutlarıyla Uyumluluk"}
                />
                <AuthCarousel
                  img={"/images/statistic.svg"}
                  title={"İstatistikler"}
                  desc={"Geniş Tutulan İstatistikler"}
                />
                <AuthCarousel
                  img={"/images/customer.svg"}
                  title={"Müşteri memnuniyeti"}
                  desc={"Deneyim Sonunda Üründen Memnun Müşteriler"}
                />
                <AuthCarousel
                  img={"/images/admin.svg"}
                  title={"Yönetim Paneli"}
                  desc={"Tek Yerden Yönetim"}
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
