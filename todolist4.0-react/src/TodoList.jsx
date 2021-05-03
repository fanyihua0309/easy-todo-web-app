import React, {useState} from 'react'

import { Button, Input } from 'antd';
import { Table, Space } from 'antd';
import './App.less'

const TodoList = ({todoItems, onClickEditBtn, onClickEditSubmitBtn, onClickDeleteBtn, onClickCompleteBtn}) => {

  const [editContent, seteditContent] = useState("");

  /**
   * 存储编辑的待办事项内容
   * @param {*} e onChange传递的事件参数
   */
   const storeEditContent = (e) => {
    seteditContent(e.target.value);
  }

  /**
   * 当用户输入编辑内容完毕，点击提交按钮时
   * @param {number} id 当前待办事项的id
   */
   const handleEditSubmit = (id) => {
    let copyTodoItems = Array.from(todoItems);
    copyTodoItems = copyTodoItems.map((curItem) => {
      if(curItem.id === id){
        curItem.content = editContent;
        curItem.edit = false;
      }
      return curItem;
    })
    onClickEditSubmitBtn(copyTodoItems);
  }

  /**
   * 将 id, content 抛出给父组件，并设置 editContent 的值
   * @param {*} e onClick传递的事件参数
   * @param {number} id 待办事项的id
   * @param {string} content 待办事项的内容
   */
  const onClickEditBtn1 = (e, id, content) => {
    onClickEditBtn(id);
    seteditContent(content);
  }

  const columns = [
    {
      title: '待办事项',
      dataIndex: 'content',
      key: 'content',
      // width: '500px',
      render: (text, record) => {
        return (
          record.edit ? 
          (<div>
            <Input type="text" allowClear value={editContent} onChange={storeEditContent}/>
            <Button type="primary" onClick={() => handleEditSubmit(record.id)}>提交</Button>
          </div>)
          :
            (<span style={{textDecoration: (record.complete ? "line-through" : "none")}}>
              {text}
            </span>)
        )
      }
    },
    {
      title: '操作',
      key: 'operation',
      // width: '200px',
      render: (text, record) => {
          return (
            <Space size="middle">
              <Button type="primary" onClick={(e) => onClickEditBtn1(e, record.id, record.content)}>编辑</Button>
              <Button type="primary" onClick={() => onClickDeleteBtn(record.id)}>删除</Button>
              <Button type="primary" onClick={() => onClickCompleteBtn(record.id)}>
                {record.complete ? "未完成" : "完成"}
              </Button>
            </Space>
          )
      },
    },
  ];


  return (
    <div>
      {/* <h2 id="table-caption">待办事项列表</h2>   */}
      <Table 
        columns={columns} 
        dataSource={todoItems.filter((curItem) => {return curItem.show === true;})} 
        pagination={{pageSize: 6, position: "topRight"}}
        // title="待办事项列表"
        id="table"
      />
    </div>
  )
}

export default TodoList;