import React, { Component } from 'react'
import { Table, Pagination, Card, Modal, Button, Form, Input, InputNumber, Select, Checkbox, Radio, notification } from 'antd'
import ReactEcharts from 'echarts-for-react'
import axios from 'axios'
import qs from 'qs'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

// react-draft-wysiwyg begin
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// react-draft-wysiwyg end

const { Option } = Select;
const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 19,
    }
};

export default class Blog extends Component {
    state = {
        showRichText: false, // react-draft-wysiwyg
        editorContent: '', // react-draft-wysiwyg
        editorState: '', // react-draft-wysiwyg
        chartData: [
            ['2019-10-10', 200],
            ['2019-10-11', 400],
            ['2019-10-12', 650],
            ['2019-10-13', 500],
            ['2019-10-14', 250],
            ['2019-10-15', 300],
            ['2019-10-16', 450],
            ['2019-10-17', 300],
            ['2019-10-18', 200]
        ],
        selectedRowKeys: [], // 表格选择项Keys
        selectedRows: [], // 表格选择项Rows
        tableData: [],
        total: 0, // for Pagination
        columns: [
            {
                title: 'ID',
                dataIndex: 'id',
                width: 30,
            },
            {
                title: '标题',
                dataIndex: 'title',
                width: 500,
                render: (text, record) => <a href="javascript: void(0)" target="_self" onClick={() => this.handleShowDetailBlog(record.id)}>{text}</a>
            },
            {
                title: '内容',
                dataIndex: 'content'
            },
        ],
        addModalVisible: false,
        showBlogModalVisible: false,
        blogDetail: ''
    };

    /**
     *
     * @react-draft-wysiwyg begin
     */
    handleClearContent = () => {
        this.setState({
            editorState: ''
        })
    }

    handleGetText = () => {
        this.setState({
            showRichText: true
        })
    }

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };
    // @react-draft-wysiwyg end

    getSalesVolumeChartData = (chartData) => {
        return {
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '30%']
            },
            visualMap: {
                type: 'piecewise',
                show: false,
                dimension: 0,
                seriesIndex: 0,
                pieces: [{
                    gt: 1,
                    lt: 3,
                    color: 'rgba(0, 180, 0, 0.5)'
                }, {
                    gt: 5,
                    lt: 7,
                    color: 'rgba(0, 180, 0, 0.5)'
                }]
            },
            series: [
                {
                    type: 'line',
                    smooth: 0.6,
                    symbol: 'none',
                    lineStyle: {
                        color: 'green',
                        width: 5
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        label: { show: false },
                        data: [
                            { xAxis: 1 },
                            { xAxis: 3 },
                            { xAxis: 5 },
                            { xAxis: 7 }
                        ]
                    },
                    areaStyle: {},
                    data: chartData
                }
            ]
        };
    }

    onTableSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log('selectedRows changed: ', selectedRows);
        this.setState({ selectedRowKeys, selectedRows });
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    /**
     * 表格
     */

    // 获取表格数据
    getData(pageNumber, pageSize) {
        const data = [{
            key: "1234",
            id: "1234",
            title: "hhhh",
            content: "hhhh",
        }]

        this.setState({
            tableData: data,
            total: 1
        })


    }

    onChange = (pageNumber, pageSize) => {
        this.pageNum = pageNumber;
        this.getData(pageNumber, pageSize);
    };

    /**
     * 添加modal
     */

    // for modal
    showAddModal = () => {
        this.setState({
            addModalVisible: true
        })
    }

    addModalHandleOk = e => {
        const _this = this;
        this.addModalFormRef.current.validateFields()
            .then(values => {
                console.log(this.state.editorContent);
                const params = {
                    title: values.title,
                    content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                };

      
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    addModalHandCancel = e => {
        this.addModalFormRef.current.resetFields();
        this.setState({
            addModalVisible: false
        })
    }

    /**
     * 删除blog
     */
    onDeleteAdministrators = () => {
        let len = this.state.selectedRowKeys.length;

        if (len === 0) {
            notification['error']({
                message: '错误提示',
                description: '请选择要删除的文章！',
            })
        } else {
            const params = {
                idArr: JSON.stringify(this.state.selectedRowKeys)
            }

            const _this = this;

           
        }
    }

    // 表单相关
    addModalFormRef = React.createRef(); // 定义一个表单

    /**
     * 显示blog Modal
     */
    handleShowDetailBlog = (id) => {

    }

    handleShowBlogModalHandleOk = () => {
        this.setState({
            showBlogModalVisible: false
        })
    }

    handleShowBlogModalHandleCancel = () => {
        this.setState({
            showBlogModalVisible: false
        })
    }

    /**
     * 钩子函数
     */
    componentDidMount() {
        this.getData(1, 5);

        setInterval(() => {
            let chartData1 = Math.ceil(Math.random() * 100);
            let chartData2 = Math.ceil(Math.random() * 100);
            let chartData3 = Math.ceil(Math.random() * 100);
            let chartData4 = Math.ceil(Math.random() * 100);
            let chartData5 = Math.ceil(Math.random() * 100);
            let chartData6 = Math.ceil(Math.random() * 100);
            let chartData7 = Math.ceil(Math.random() * 100);
            let chartData8 = Math.ceil(Math.random() * 100);
            let chartData9 = Math.ceil(Math.random() * 100);
            let chartData = [
                ['2019-10-10', chartData1],
                ['2019-10-11', chartData2],
                ['2019-10-12', chartData3],
                ['2019-10-13', chartData4],
                ['2019-10-14', chartData5],
                ['2019-10-15', chartData6],
                ['2019-10-16', chartData7],
                ['2019-10-17', chartData8],
                ['2019-10-18', chartData9]
            ];

            this.setState({ chartData });
        }, 1000)
    }

    render() {
        // 控制表格选择
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onTableSelectChange
        };

        return (<>
            <Card
                title="Smoothed Line Chart"
            >
                <ReactEcharts option={this.getSalesVolumeChartData(this.state.chartData)}></ReactEcharts>
            </Card>

            <div style={{ height: 15 }}></div>

            <Card title="博客列表" extra={<span><Button type="primary" ghost size="small" icon={<PlusOutlined />} style={{ marginRight: 15 }} onClick={this.showAddModal}>添加</Button><Button type="primary" ghost size="small" icon={<MinusOutlined />} onClick={() => { this.onDeleteAdministrators() }}>删除</Button></span>} style={{ width: '100%' }}>
                <Table
                    onRow={record => {
                        return {
                            onClick: event => { console.log(record) }, // 点击行
                            onDoubleClick: event => { },
                            onContextMenu: event => { },
                            onMouseEnter: event => { }, // 鼠标移入行
                            onMouseLeave: event => { },
                        };
                    }}
                    rowSelection={rowSelection}
                    columns={this.state.columns}
                    dataSource={this.state.tableData}
                    pagination={{
                        current: this.pageNum,
                        total: this.state.total,
                        pageSizeOptions: [5, 10, 20, 50, 100],
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `共 ${total} 条`,
                        onChange: this.onChange
                    }}
                    bordered
                >
                </Table>

                <Modal
                    title="创建"
                    visible={this.state.addModalVisible}
                    width={660}
                    onOk={this.addModalHandleOk}
                    onCancel={this.addModalHandCancel}
                    okText="确认"
                    cancelText="取消"
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Form {...layout} ref={this.addModalFormRef} name="control-ref" preserve={false}>
                        <Form.Item label="标题" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="title"
                                style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginRight: 15 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "标题不能为空"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="内容" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="content"
                                style={{ display: 'inline-block', width: 'calc(100% - 8px)' }}
                                rules={[
                                    {
                                        required: true,
                                        message: "内容不能为空"
                                    }
                                ]}
                            >
                                <Editor
                                    editorState={this.state.editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                                {/* <TextArea rows={4} /> */}
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="详情"
                    visible={this.state.showBlogModalVisible}
                    width={660}
                    onOk={this.handleShowBlogModalHandleOk}
                    onCancel={this.handleShowBlogModalHandleCancel}
                    okText="确定"
                    cancelText="取消"
                    maskClosable={false}
                    destroyOnClose={true}
                    footer={null}
                >

                    <div dangerouslySetInnerHTML={{ __html: this.state.blogDetail }} style={{ height: 300, overflow: 'auto' }} />

                </Modal>
            </Card>
        </>
        )
    }
}
