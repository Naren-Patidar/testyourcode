/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { Badge, Icon, Input, VerticalMenu, Tooltip } from '@scuf/common';
import { EwiPayload, ExperionTag } from 'app/workInstruction/models';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  NUMBER_OF_TAGS_LIMIT,
  MAX_CHARACTERS_FOR_TAG_NAME,
  NUMBER_OF_TAG_CHARACTERS_LIMIT,
} from 'utils/app-constants';
import { selectTags } from '+store/workInstruction/selector';
import {
  addNewTagToExistingList,
  deleteTag,
  editTag,
} from '+store/workInstruction/workInstrSlice';
import { getRecentTags, addNewTag } from '+store/workInstruction/effects';
import './EWITags.scss';

const EWITags: React.FC<{ ewi: EwiPayload }> = ({ ewi }) => {
  const [isSuggested, setIsSuggested] = useState(false);
  const [isAddTag, setIsAddtag] = useState(false);
  const [editId, setEditId] = useState('');
  const [newTag, setNewTag] = useState('');
  const [sugestList, setSugestList] = useState<ExperionTag[]>([]);
  const [tagValidationMessage, setTagValidationMessage] = useState('');
  const { showPreview } = ewi;

  const dispatch = useDispatch();
  const recentTags = useSelector(selectTags);
  useEffect(() => {
    dispatch(getRecentTags());
  }, [dispatch]);

  useEffect(() => {
    setSugestList(recentTags);
  }, [recentTags]);

  const checkDuplicateTags = (value: string) => ewi.tags?.includes(value);

  const handleAddTagFromExisting = (tagname: string, index?: number) => {
    if (!(tagname !== '' && checkDuplicateTags(tagname))) {
      if (isAddTag) {
        dispatch(addNewTag(JSON.stringify(tagname)));
        dispatch(addNewTagToExistingList(tagname));
      } else {
        dispatch(editTag({ tagname: newTag, idx: index ?? -1 }));
      }
      setEditId('');
      setNewTag('');
      setIsSuggested(false);
      setSugestList(recentTags);
    }
  };

  const suggestedTagItems =
    !!sugestList.length &&
    sugestList.map((tag, key) => (
      <VerticalMenu.Item
        key={tag.id}
        onClick={() => handleAddTagFromExisting(tag.name)}
      >
        {tag.name}
      </VerticalMenu.Item>
    ));

  const handleInputChange = (inputTagname: string) => {
    if (inputTagname.length <= NUMBER_OF_TAG_CHARACTERS_LIMIT) {
      setTagValidationMessage('');
      setNewTag(inputTagname);

      if (recentTags && !!recentTags.length) {
        const tagInput = inputTagname.toLowerCase();
        const matchingTags = recentTags.filter((option) => {
          return option.name.toLowerCase().includes(tagInput);
        });
        if (matchingTags.length) {
          setSugestList(matchingTags);
          setIsSuggested(true);
        } else {
          setIsSuggested(false);
        }
      }
    } else {
      setTagValidationMessage(MAX_CHARACTERS_FOR_TAG_NAME);
    }
  };

  const handleOnEnter = (index?) => {
    if (!(newTag !== '' && checkDuplicateTags(newTag))) {
      if (newTag !== '' && editId === '') {
        dispatch(addNewTag(JSON.stringify(newTag)));
        dispatch(addNewTagToExistingList(newTag));
      } else {
        dispatch(editTag({ tagname: newTag, idx: index }));
      }
      setEditId('');
      setNewTag('');
      setIsSuggested(false);
      setSugestList(recentTags);
      setTagValidationMessage('');
    }
  };

  const handleOnDoubleClickOfTag = (tag: string) => {
    setTagValidationMessage('');
    setEditId(tag);
    setNewTag(tag);
    setIsAddtag(false);
    setSugestList(recentTags);
    setIsSuggested(true);
  };

  return (
    <>
      <div className="tags-list">
        {!!ewi.tags &&
          !!ewi.tags.length &&
          ewi.tags.map((tag: string, index) => (
            <div
              key={tag}
              id={tag}
              className={`input-tag ${editId === tag && isSuggested && `show`}`}
            >
              {editId === tag ? (
                <Input
                  className="dropdown-btn"
                  placeholder="Edit tag"
                  value={newTag}
                  error={tagValidationMessage}
                  onChange={(value) => handleInputChange(value)}
                  onEnter={() => handleOnEnter(index)}
                />
              ) : (
                <Badge
                  onDoubleClick={() =>
                    showPreview ? null : handleOnDoubleClickOfTag(tag)
                  }
                >
                  {tag}
                </Badge>
              )}
              {editId === tag && isSuggested && <span className="caret" />}
              {!showPreview && (
                <Icon
                  onClick={() => dispatch(deleteTag(tag))}
                  root="common"
                  className="px-1 close"
                  name="close"
                  size="small"
                />
              )}
              {editId === tag && isSuggested && (
                <div className="dropdown-menu dropdown-menu-left dropdown-group dropdown-mini show">
                  <VerticalMenu>
                    <VerticalMenu>
                      <VerticalMenu.Header>
                        Recently used
                        <Icon
                          root="common"
                          name="close"
                          size="small"
                          className="close"
                          onClick={() => setIsSuggested(false)}
                        />
                      </VerticalMenu.Header>
                      {suggestedTagItems}
                    </VerticalMenu>
                  </VerticalMenu>
                </div>
              )}
            </div>
          ))}
        {isAddTag &&
          !(!!ewi && !!ewi.tags && ewi.tags.length >= NUMBER_OF_TAGS_LIMIT) && (
            <div className={`input-tag ${isSuggested && `show`}`}>
              <Input
                className="dropdown-btn"
                placeholder="New tag"
                onChange={(value) => handleInputChange(value)}
                onEnter={() => handleOnEnter()}
                value={newTag}
                error={tagValidationMessage}
                onFocus={() => {
                  setIsSuggested(true);
                }}
              />
              {isSuggested && editId === '' && <span className="caret" />}
              <Icon
                root="common"
                className="px-1 close"
                name="close"
                size="small"
                onClick={() => {
                  setIsAddtag(false);
                  setNewTag('');
                }}
              />
              {isSuggested && editId === '' && (
                <div className="dropdown-menu dropdown-menu-left dropdown-group dropdown-mini show">
                  <VerticalMenu>
                    <VerticalMenu>
                      <VerticalMenu.Header>
                        Recently used
                        <Icon
                          root="common"
                          name="close"
                          size="small"
                          className="close"
                          onClick={() => setIsSuggested(false)}
                        />
                      </VerticalMenu.Header>
                      {suggestedTagItems}
                    </VerticalMenu>
                  </VerticalMenu>
                </div>
              )}
            </div>
          )}
      </div>
      {!showPreview && (
        <span
          className={`add-tagbtn d-block ${
            (isAddTag ||
              (!!ewi &&
                !!ewi.tags &&
                ewi.tags.length >= NUMBER_OF_TAGS_LIMIT)) &&
            `addtag-disabled`
          }`}
          onClick={() => setIsAddtag(true)}
        >
          <Icon
            root="common"
            className="pr-4"
            name="slidercontrols-plus"
            size="small"
          />
          {isAddTag ||
          (!!ewi && !!ewi.tags && ewi.tags.length >= NUMBER_OF_TAGS_LIMIT) ? (
            <Tooltip
              content="Enter tag name and press Enter to save"
              element={<span> Add Tag</span>}
              position="bottom left"
              event="hover"
              className="customclass"
            />
          ) : (
            <span> Add Tag </span>
          )}
        </span>
      )}
    </>
  );
};

export default EWITags;
