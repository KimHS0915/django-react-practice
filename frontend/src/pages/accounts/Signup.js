import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Form, Input, Button, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { axiosInstance } from 'api';
import LogoImage from 'assets/logo.png';
import './Signup.scss';

function Signup() {
    const history = useHistory();
    
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = (values) => {
        async function fn() {
            const { username, password, email, name } = values;
            setFieldErrors({});

            const data = { username, password, email, name };

            try {
                await axiosInstance.post(
                    "/accounts/signup/", data
                );
                notification.open({
                    message: "회원 가입에 성공했습니다.",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{ color: "blueviolet" }} />
                });
                history.push("/accounts/login");
            }
            catch(error) {
                if (error.response) {
                    notification.open({
                        message: "회원 가입에 실패했습니다.",
                        description: "아이디/패스워드를 확인하세요.",
                        icon: <FrownOutlined style={{ color: "red" }} />
                    });

                    const { data: FieldsErrorMessages } = error.response;
                    setFieldErrors(
                        Object.entries(FieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
                            acc[fieldName] = {
                                validateStatus: "error",
                                help: errors.join(" "),
                            }
                            return acc;
                        }, {})
                    )
                }
            }
        }
        fn();
    }

    return (
        <>
            <Card title={<img src={LogoImage} alt="logo" />} className="card3">
                <div>
                    <Form
                        {...layout}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="email" 
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email을 입력하세요.",
                                },
                            ]}
                            hasFeedback
                            {...fieldErrors.email}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            className="name" 
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Name을 입력하세요.",
                                },
                            ]}
                            hasFeedback
                            {...fieldErrors.name}
                        >
                            <Input maxLength="50" placeholder="Name" />
                        </Form.Item>

                        <Form.Item
                            className="username" 
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Username을 입력하세요.",
                                },
                                {
                                    min: 5,
                                    message: "5글자 이상 입력하세요."
                                },
                            ]}
                            hasFeedback
                            {...fieldErrors.username}
                        >
                            <Input maxLength="12" placeholder="Username" />
                        </Form.Item>
                        
                        <Form.Item
                            className="password" 
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '패스워드를 입력하세요',
                                },
                                {
                                    min: 8,
                                    message: "8글자 이상 입력하세요.",
                                }
                            ]}
                            {...fieldErrors.password}
                        >
                            <Input.Password maxLength="12" placeholder="Password" />
                        </Form.Item>
                        
                        <Form.Item {...tailLayout} valuePropName="checked">
                        </Form.Item>
                        
                        <Form.Item {...tailLayout}>
                            <Button 
                                type="primary" htmlType="submit"
                                className="submit"
                            >
                                가입
                            </Button>
                        </Form.Item>
                    </Form>      
                </div>            
            </Card>
            <div className="card4">
                <div className="container">
                계정이 있으신가요?
                    <a className="mvsignup" href="/accounts/login">로그인</a>
                </div>
            </div>
        </>
    );
}

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default Signup;
