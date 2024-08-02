import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';

import TextField from '../../components/input';
import { useCreateArticleMutation, useUpdateArticleMutation } from '../../redux';

import Class from './styles.module.scss';

const NewArticlePage = () => {
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const props = useLocation().state
    ? useLocation().state
    : { title: '', description: '', body: '', tagList: [] };
  const { title, description, body, tagList } = props;

  const tagObj = {};
  tagList.forEach((tag) => {
    tagObj[`tag${Math.floor(Date.now() * Math.random())}`] = tag;
  });
  const tagArray = Object.entries(tagObj).map((item) => ({ placeholder: 'Tag', name: item[0] }));

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: { title, description, body, ...tagObj },
  });
  const navigate = useNavigate();
  const [tagsData, setTagsData] = useState(tagArray || []);
  function addTag() {
    const newTag = { placeholder: 'Tag', name: `tag${Date.now()}` };
    const todoDataChange = [...tagsData, newTag];
    setTagsData(todoDataChange);
  }

  function deleteTag(name) {
    const todoDataChange = tagsData.filter((el) => el.name !== name);
    setTagsData(todoDataChange);
  }

  const tagElements = tagsData.map((item) => (
    <li key={item.name} className={Class.tag}>
      <TextField {...item} control={control} />
      <Button danger onClick={() => deleteTag(item.name)} style={{ height: '40px' }}>
        Delete
      </Button>
    </li>
  ));

  const submit = async (e) => {
    const tagArr = Object.entries(e)
      .filter((item) => tagsData.map((tag) => tag.name).includes(item[0]))
      .map((item) => item[1]);
    const articleInfo = Object.fromEntries(
      Object.entries(e).filter((item) => !item[0].includes('tag'))
    );
    articleInfo.tagList = tagArr;
    if (props.slug) await updateArticle({ body: { article: articleInfo }, slug: props.slug });
    else await createArticle({ article: articleInfo });
    reset();
    navigate('/');
  };

  return (
    <div className={Class.article}>
      <h1 className={Class.title}>Create new article</h1>
      <form className={Class.flex}>
        <TextField placeholder="Title" name="title" control={control} />
        <TextField placeholder="Short description" name="description" control={control} />
        <TextField placeholder="Text" name="body" control={control} />
        <div className={Class.tags}>
          {tagsData.length > 0 && (
            <label>
              Tags
              <ul>{tagElements}</ul>
            </label>
          )}
          <Button onClick={() => addTag()} style={{ height: '40px', marginBottom: '5px' }}>
            Add tag
          </Button>
        </div>
        <Button type="primary" onClick={handleSubmit(submit)} style={{ height: '40px' }}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default NewArticlePage;
