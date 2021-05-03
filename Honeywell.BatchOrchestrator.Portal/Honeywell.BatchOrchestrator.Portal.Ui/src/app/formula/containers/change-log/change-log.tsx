import React, { useState } from 'react';
import { Card, Modal, Tree } from '@scuf/common';
import { useSelector, useDispatch } from 'react-redux';
import { EWI_STATUS } from 'utils';
import {
  selectIsAuthoringScreenActive,
  selectIsAuthoringScreenCloseIconActive,
  selectChangeLog,
  selectEwi,
} from '+store/workInstruction/selector';
import './change-log.scss';
import {
  setActiveModalPopup,
  emptyChangeLog,
  onCloseOfModalPopup,
} from '+store/workInstruction/workInstrSlice';

const { Item } = Tree.Content;

const Changelog: React.FC = () => {
  const data = useSelector(selectChangeLog);
  const dispatch = useDispatch();
  const ewi = useSelector(selectEwi);
  const isAuthoringScreenActive: boolean = useSelector(
    selectIsAuthoringScreenActive
  );
  const [highlighetedclassname, setHighlighetedclassname] = useState('');
  const isAuthoringScreenCloseIconActive: boolean = useSelector(
    selectIsAuthoringScreenCloseIconActive
  );
  const renderpassedComonent = (key, passedobject) => (
    <Item title={`${key.charAt(0).toUpperCase()}${key.substr(1)}`}>
      <Item title={`Prev: ${passedobject[key].prev}`} />
      <Item title={`Curr: ${passedobject[key].current}`} />
    </Item>
  );

  const renderEachViewComponent = (eachcontent) => {
    return Object.keys(eachcontent)
      .filter(
        (key) =>
          eachcontent[key] instanceof Object &&
          (eachcontent[key].prev || eachcontent[key] instanceof Array)
      )
      .map((filterkey) => {
        if (filterkey === 'components') {
          if (!eachcontent[filterkey] || eachcontent[filterkey].length === 0) {
            return <Item title="" />;
          }
          const componentchildmodified = eachcontent[filterkey].filter(
            (eachcomponent) =>
              eachcomponent.stateCode === EWI_STATUS.MODIFIED ||
              !eachcomponent.stateCode
          );
          const componentchildadded = eachcontent[filterkey].filter(
            (eachcomponent) => eachcomponent.stateCode === EWI_STATUS.DRAFT
          );
          const componentchilddeleted = eachcontent[filterkey].filter(
            (eachcomponent) =>
              eachcomponent.stateCode === EWI_STATUS.UNDERREVIEW
          );

          const rendercomponentchildmodified = componentchildmodified.map(
            (components) => {
              let title = '';
              if (components.label instanceof Object) {
                title = components.label.current;
              } else if (components.label) {
                title = components.label;
              } else {
                title = `label${components.key}`;
              }
              if (
                Object.keys(components).some(
                  (key) =>
                    components[key] instanceof Object && components[key].prev
                )
              ) {
                return (
                  <Item title={title}>
                    {renderEachViewComponent(components)}
                  </Item>
                );
              }
              return <Item title={title} />;
            }
          );

          const rendercomponentchildadded = componentchildadded.map(
            (components) => {
              if (
                Object.keys(eachcontent).some(
                  (key) =>
                    eachcontent[key] instanceof Object && eachcontent[key].prev
                )
              ) {
                let title = '';
                if (components.label instanceof Object) {
                  title = components.label.current;
                } else if (components.label) {
                  title = components.label;
                } else {
                  title = 'label';
                }
                return (
                  <Item title={title}>
                    {renderEachViewComponent(components)}
                  </Item>
                );
              }
              return <Item title={components.label} />;
            }
          );

          const rendercomponentchilddeleted = componentchilddeleted.map(
            (components) => {
              if (
                Object.keys(eachcontent).some(
                  (key) =>
                    eachcontent[key] instanceof Object && eachcontent[key].prev
                )
              ) {
                let title = '';
                if (components.label instanceof Object) {
                  title = components.label.current;
                } else {
                  title = components.label;
                }
                return (
                  <Item title={title}>
                    {renderEachViewComponent(components)}
                  </Item>
                );
              }
              return <Item title={components.label} />;
            }
          );

          return (
            <Item title="Components">
              <Item title="Modified">{rendercomponentchildmodified}</Item>
              <Item title="Added">{rendercomponentchildadded}</Item>
              <Item title="Deleted">{rendercomponentchilddeleted}</Item>
            </Item>
          );
        }
        return renderpassedComonent(filterkey, eachcontent);
      });
  };

  const highlightnow = (classnamedata, tagsname) => {
    if (highlighetedclassname !== '') {
      if (
        (highlighetedclassname === 'tags' ||
          highlighetedclassname === 'safetcheck' ||
          highlighetedclassname === 'documentlink') &&
        tagsname !== highlighetedclassname
      ) {
        if (highlighetedclassname === 'tags') {
          data.tags.added.forEach((element) => {
            document.getElementById(element)?.classList.remove('hightlighter');
          });
        } else if (highlighetedclassname === 'safetcheck') {
          data.safety.added.forEach((element) => {
            document.getElementById(element)?.classList.remove('hightlighter');
          });
        } else {
          data.attachments.forEach((element) => {
            if (element.title instanceof Object) {
              document
                .getElementById(element.doc_id)
                ?.classList.remove('hightlighter');
            }
          });
        }
      } else {
        document
          .getElementById(highlighetedclassname)
          ?.classList.remove('hightlighter');
      }
    }

    if (
      (highlighetedclassname === 'safetcheck' ||
        highlighetedclassname === 'documentlink') &&
      tagsname !== highlighetedclassname
    ) {
      dispatch(onCloseOfModalPopup());
    }

    document.getElementById(classnamedata)?.classList.add('hightlighter');
    if (
      tagsname === 'tags' ||
      tagsname === 'safetcheck' ||
      tagsname === 'documentlink'
    ) {
      setHighlighetedclassname(tagsname);
    } else {
      setHighlighetedclassname(classnamedata);
    }
  };

  const renderViewContent = (viewcontent) => {
    return viewcontent.map((eachcontent) => {
      let title;
      if (eachcontent.instruction_name) {
        if (eachcontent.instruction_name.current) {
          title = eachcontent.instruction_name.current;
        } else {
          title = eachcontent.instruction_name;
        }
      } else {
        title = 'instruction';
      }
      return (
        <Item title={title} onClick={() => highlightnow(eachcontent.key, '')}>
          {renderEachViewComponent(eachcontent)}
        </Item>
      );
    });
  };
  const renderAttachements = (attachments) => {
    return attachments.map((attachmentdata) => {
      if (attachmentdata.title instanceof Object) {
        return (
          <Item title={attachmentdata.title.current}>
            <Item title={attachmentdata.title.prev} />
            <Item title={attachmentdata.title.current} />
          </Item>
        );
      }
      return <Item title={attachmentdata.title} />;
    });
  };

  return (
    <Card
      className="change-log"
      closeIcon={false}
      open={isAuthoringScreenActive}
      // size="small"
      closeOnDimmerClick={false}
      onClose={() => dispatch(emptyChangeLog)}
    >
      <Card.Header>
        <h6>Select changes from list to view</h6>
      </Card.Header>
      <Card.Content>
        {data && Object.keys(data).length !== 0 ? (
          <Tree>
            <Tree.Content>
              <Item
                title="Title"
                onClick={() => {
                  highlightnow('ewititle', '');
                }}
              >
                {data.ewi_title instanceof Object ? (
                  <>
                    <Item title={`Prev: ${data.ewi_title.prev}`} />
                    <Item title={`Curr: ${data.ewi_title.current}`} />
                  </>
                ) : (
                  <Item title="" />
                )}
              </Item>
              <Item
                title="Description"
                onClick={() => {
                  highlightnow('intructiontitle', '');
                }}
              >
                {data.description instanceof Object ? (
                  <>
                    <Item title={`Prev: ${data.description.prev}`} />
                    <Item title={`Curr: ${data.description.current}`} />
                  </>
                ) : (
                  <Item title="" />
                )}
              </Item>
              <Item
                title="Tags"
                onClick={() => {
                  data.tags.added.forEach((element) => {
                    highlightnow(element, 'tags');
                  });
                }}
              >
                <Item title="tags">
                  {data.tags.tags.map((eachtags) => (
                    <Item title={eachtags} />
                  ))}
                </Item>
                <Item title="added">
                  {data.tags.added.map((eachadded) => (
                    <Item title={eachadded} />
                  ))}
                </Item>
                <Item title="deleted">
                  {data.tags.deleted.map((eachdeleted) => (
                    <Item title={eachdeleted} />
                  ))}
                </Item>
              </Item>
              <Item
                title="Safety"
                onClick={() => {
                  data.safety.added.forEach((element) => {
                    highlightnow(element, 'safetcheck');
                  });
                  dispatch(setActiveModalPopup('Safety check'));
                }}
              >
                <Item title="Checklist">
                  {data.safety.checklist.map((eachtags) => (
                    <Item title={eachtags} />
                  ))}
                </Item>
                <Item title="Added">
                  {data.safety.added.map((eachadded) => (
                    <Item title={eachadded} />
                  ))}
                </Item>
                <Item title="Deleted">
                  {data.safety.deleted.map((eachdeleted) => (
                    <Item title={eachdeleted} />
                  ))}
                </Item>
              </Item>
              <Item
                title="Attachments"
                onClick={() => {
                  if (data.attachments) {
                    data.attachments.forEach((element) => {
                      highlightnow(element.doc_id, 'documentlink');
                    });
                    dispatch(setActiveModalPopup('Document link'));
                  }
                }}
              >
                <Item title="Added">
                  {renderAttachements(
                    data.attachments.filter(
                      (eachAttachments) =>
                        eachAttachments.stateCode === EWI_STATUS.DRAFT
                    )
                  )}
                </Item>
                <Item title="Deleted">
                  {renderAttachements(
                    data.attachments.filter(
                      (eachAttachments) =>
                        eachAttachments.stateCode === EWI_STATUS.UNDERREVIEW
                    )
                  )}
                </Item>
              </Item>
              <Item title="View Content">
                <Item title="Modified">
                  {renderViewContent(
                    data.view_content.filter(
                      (eachviewcontent) =>
                        eachviewcontent.stateCode === EWI_STATUS.MODIFIED ||
                        !eachviewcontent.stateCode
                    )
                  )}
                </Item>
                <Item title="Added">
                  {renderViewContent(
                    data.view_content.filter(
                      (eachviewcontent) =>
                        eachviewcontent.stateCode === EWI_STATUS.DRAFT
                    )
                  )}
                </Item>
                <Item title="Deleted">
                  {renderViewContent(
                    data.view_content.filter(
                      (eachviewcontent) =>
                        eachviewcontent.stateCode === EWI_STATUS.UNDERREVIEW
                    )
                  )}
                </Item>
              </Item>
            </Tree.Content>
          </Tree>
        ) : (
          <div>
            <p className="pt-5">No changes available</p>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default Changelog;
