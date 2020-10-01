import React from 'react';
import { Avatar, Card } from 'antd';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';

function Post({ post }) {
    const { caption, location, photo } = post;
    return (
        <div>
            <Card 
                hoverable 
                cover={<img src={photo} alt={caption} />} 
                actions={[<HeartOutlined />]}
            >
                <Card.Meta 
                    avatar={<Avatar size="large" icon={<UserOutlined />} />} 
                    title={location} 
                    description={caption} 
                />
            </Card>
        </div>
    );
}

export default Post;