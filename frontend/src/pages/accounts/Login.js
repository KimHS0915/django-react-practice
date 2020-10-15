import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, Form, Input, Button, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { setToken } from 'store';
import { useAppContext } from 'store';
import parseErrorMessage from 'utils/forms';
import { axiosInstance } from 'api';
import LogoImage from 'assets/logo.png';
import './Login.scss';

function Login() {
    const { dispatch } = useAppContext();

    const location = useLocation();
    const history = useHistory();

    const [fieldErrors, setFieldErrors] = useState({});

    const { from: loginRedirectUrl } = location.state || { from: { pathname: "/" }};

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;
            setFieldErrors({});

            const data = { username, password };

            try {
                const response = await axiosInstance.post(
                    "/accounts/token/", data
                );
                const { 
                    data: { token: jwtToken } 
                } = response;

                // setJwtToken(jwtToken);
                dispatch(setToken(jwtToken));

                notification.open({
                    message: "로그인에 성공했습니다.",
                    description: "",
                    icon: <SmileOutlined style={{ color: "blueviolet" }} />
                });
                history.push(loginRedirectUrl);
            }
            catch(error) {
                if (error.response) {
                    notification.open({
                        message: "로그인에 실패했습니다.",
                        description: "아이디/패스워드를 확인하세요.",
                        icon: <FrownOutlined style={{ color: "red" }} />
                    });

                    const { data: fieldsErrorMessages } = error.response;
                    setFieldErrors(parseErrorMessage(fieldsErrorMessages));
                }
            }
        }
        fn();
    }

    return (
        <>
            <Card title={<img src={LogoImage} alt="logo" />} className="card">
                <div>
                    <Form
                        {...layout}
                        onFinish={onFinish}
                    >
                        <Form.Item 
                            className="username" 
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Username을 입력하세요.    ",
                                },
                                {
                                    min: 5,
                                    message: "5글자 이상 입력하세요.    "
                                },
                            ]}
                            hasFeedback
                            {...fieldErrors.username}
                            {...fieldErrors.non_field_errors}
                        >
                            <Input />
                        </Form.Item>
                        
                        <Form.Item
                            className='password' 
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '패스워드를 입력하세요.    ',
                                },
                            ]}
                            {...fieldErrors.password}
                        >
                            <Input.Password />
                        </Form.Item>
                        
                        <Form.Item {...tailLayout}  valuePropName="checked">
                        </Form.Item>
                        
                        <Form.Item {...tailLayout}>
                            <Button
                                className="submit"  
                                type="primary"  htmlType="submit"
                            >
                                로그인
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            <div className="card2">
                <div className="container">
                계정이 없으신가요?
                    <a className="mvsignup" href="/accounts/signup">가입하기</a>
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

export default Login;
