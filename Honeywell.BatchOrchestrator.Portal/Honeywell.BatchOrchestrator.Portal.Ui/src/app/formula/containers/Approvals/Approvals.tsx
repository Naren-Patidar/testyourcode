/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-shorthand */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Approvals.scss';
import { Accordion, TextArea, Button, Modal, Card, Grid } from '@scuf/common';
// import { Button } from '@scuf/common'
import { useHistory, useLocation } from 'react-router-dom';
import { useInjectReducer } from 'utils/@reduxjs';

import '../../components/AlertPopup/MessageBox.scss';

import { WorkInstruction } from 'app/workInstruction/models';
import { errorHandler } from 'core/error';
import { CampaignStatusValues } from 'app/campaign/models/campaign';
import { AuthoringControlSet } from 'framework-authoring';
import { AppRoutes } from 'routing/app.route-names';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { PageTitle } from 'shared/page-title';
import { withApprovalContext } from '../../controllers/approvals/approval-context';
import AlertPopup from '../../components/AlertPopup/AlertPopup';
import {
  CustomCard,
  CompareTable,
  Header,
  Filter,
  CampaignCard,
} from '../../components';
import WICard from '../../../workInstruction/containers/WICard';
import { workInstrAPI } from '../../../workInstruction/services/workInstrAPI';
import WIAuthoringCard from '../../../workInstruction/containers/WIAuthoringCard/WIAuthoringCard';
import {
  sliceKey,
  reducer,
  setAuthoringScreenActiveStatus,
  setIsAuthoringControlSetActive,
  toggleAuthoringScreen,
  clearEwi,
} from '+store/workInstruction/workInstrSlice';
import { previewWorkInstruction } from '+store/workInstruction/effects';
import Changelog from '../change-log/change-log';
import { MANDATORY_APPROVER_COMMENTS } from '../../../../utils/app-constants';

import {
  SelectSelectedTask,
  selectIsAuthoringControlSetActive,
  selectIsAuthoringScreenActive,
} from '+store/workInstruction/selector';
import CampaignApprovalDetails from './campaign-approval-details';

const Approvals = (props) => {
  useInjectReducer({ key: sliceKey, reducer });

  const history = useHistory();

  const {
    getPendingItems,
    pendingList,
    getFormulaSet,
    formulaSetInfo,
    approveFormulaSetStatus,
    rejectFormulaSetStatus,
    formulaInfo,
    approveFormulaStatus,
    rejectFormulaStatus,
    getFormula,
    getFormulaSetComments,
    getFormulaComments,
    formulaSetComments,
    formulaComments,
    getPendingCampaigns,
    PendingCampaignList,
    UpdateCampaignStatus,
  } = props;

  type CampaignCommentsFormProps = {
    approverComment: string;
    submitterComment: string;
  };
  const InitStateCampaignComments: CampaignCommentsFormProps = {
    approverComment: '',
    submitterComment: '',
  };

  const dispatch = useDispatch();

  const [accordianActive, setAccordianActive] = useState('');
  const [id, setId] = useState(null);
  const [filterData, setFilterData] = useState('Viewall');
  const [itemType, setItemType] = useState('formulaset');
  const [popupFlag, setPopupFlag] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [approverComment, setApproverComment] = useState('');
  const [PendingRequests, setPendingRequests] = useState(false);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [approvalType, setApprovalType] = useState('');
  const [open, setOpen] = useState(false);
  const [pendingApproval, setPendingApproval] = useState([]);
  const [comment, setComment] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [commentsMandatoryMessage, setCommentsMandatoryMessage] = useState('');
  const [actionState, setActionState] = useState<
    'loading' | 'finished' | 'error' | null
  >(null);
  const [
    campaignComments,
    setCampaignComments,
  ] = useState<CampaignCommentsFormProps>(InitStateCampaignComments);

  const [pendingItemsCount, setPendingItemsCount] = useState(0);
  // const [active, setActive] = useState(false);
  const selectedTask = useSelector(SelectSelectedTask);
  const isAuthoringControlSetActive = useSelector(
    selectIsAuthoringControlSetActive
  );
  const isAuthoringScreenActive = useSelector(selectIsAuthoringScreenActive);

  const location = useLocation();

  useEffect(() => {
    setAccordianActive(`${location.state}`);
  }, []);

  useEffect(() => {
    getPendingItems().then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItem(res.message);
        setOpen(!open);
      }
    });
    getPendingCampaigns().then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItem(res.message);
        setOpen(!open);
      }
    });
  }, []);
  useEffect(() => {
    document.body.classList.add('approval-screen');
  });
  const getPendingApprovals = async () => {
    const response = await workInstrAPI.getPendingApprovals();
    if (response && response.status === 200) {
      const dataArr = response.data;
      dataArr.filter((item) => {
        item.title = item.ewiTitle;
        item.id = item.workInstrDefId;
        item.lastModifiedAt = item.actionAt;
        return item;
      });
      setPendingApproval(dataArr);
    }
  };
  useEffect(() => {
    getPendingApprovals();
    return () => {
      document.body.classList.remove('approval-screen');
      dispatch(clearEwi());
    };
  }, []);

  const { authorized: authEWI } = useAuthorize([
    PermissionValues.ApproveWorkInstruction,
    PermissionValues.AuthorWorkInstruction,
    PermissionValues.ImportWorkInstruction,
    PermissionValues.EditWorkInstruction,
    PermissionValues.ViewWorkInstruction,
    PermissionValues.DeleteWorkInstruction,
  ]);
  const { authorized: canApproveCampaign } = useAuthorize([
    PermissionValues.ApproveProductionCampaign,
  ]);
  const { authorized: canApproveFormulaAndFormulaSet } = useAuthorize([
    PermissionValues.ApprovaAndReject,
  ]);
  useEffect(() => {
    let count = 0;
    if (canApproveFormulaAndFormulaSet) {
      count += pendingList?.length;
    }
    if (canApproveCampaign) {
      count += PendingCampaignList?.length;
    }
    if (authEWI) {
      count += pendingApproval?.length;
    }
    setPendingItemsCount(count);
  }, [pendingList, pendingApproval, PendingCampaignList]);
  const handleAuthoringControl = (value?) => {
    // dispatch(saveTaskDetailsFromAuthoringControlSet(value));
    dispatch(setIsAuthoringControlSetActive(false));
  };
  const closeModal = () => {
    // if (e.path == undefined) {
    setOpen(false);
    // }
  };
  const renderModal = () => {
    return (
      <Modal
        className="modal-Popup"
        size="small"
        closeIcon
        onClose={() => closeModal()}
        open={open}
        closeOnDimmerClick={false}
      >
        <Modal.Header className="modal-Popup-header">Alert</Modal.Header>
        <Modal.Content className="modal-Popup-content">
          {messageBoxItem}
        </Modal.Content>
        <Modal.Footer className="modal-Popup-footer">
          {/* <Button className="messageBoxCancel" type="secondary" size="medium" content="Cancel" onClick={(e) => closeModal(e)} /> */}
          <Button
            // className="messageBoxSubmit"
            type="primary"
            size="small"
            content="Ok"
            onClick={(e) => closeModal()}
          />
        </Modal.Footer>
      </Modal>
    );
  };

  const approveFormulaSet = async () => {
    let status;
    if (itemType === 'formulaset') {
      // status =2 for approval
      // status=await approveFormulaSetStatus(id,approverComment);
      setActionState('loading');
      approveFormulaSetStatus(id, approverComment)
        .then((res) => {
          setActionState('finished');
          if (res === 200) {
            getPendingItems().then((res) => {
              if (res && res.status && res.status !== 200) {
                setMessageBoxItem(res.message);
                setOpen(!open);
              }
            });
            setId(null);
            setApproverComment('');
          } else {
            throw errorHandler(res);
          }
        })
        .catch((err) => {
          setActionState('error');
          if (err && err.status && err.status !== 200) {
            setMessageBoxItem(err.message);
            setOpen(!open);
          }
        });
    } else {
      // status =2 for approval
      // status=await approveFormulaStatus(id,approverComment);
      setActionState('loading');
      approveFormulaStatus(id, approverComment)
        .then((res) => {
          setActionState('finished');
          if (res === 200) {
            getPendingItems().then((res) => {
              if (res && res.status && res.status !== 200) {
                setMessageBoxItem(res.message);
                setOpen(!open);
              }
            });
            setId(null);
            setApproverComment('');
          } else {
            throw errorHandler(res);
          }
        })
        .catch((err) => {
          setActionState('error');
          if (err && err.status && err.status !== 200) {
            setMessageBoxItem(err.message);
            setOpen(!open);
          }
        });
    }
  };
  const rejectFormulaSet = async () => {
    let status;
    if (itemType === 'formulaset') {
      // status =0 for reject
      // status=await rejectFormulaSetStatus(id,approverComment);
      setActionState('loading');
      rejectFormulaSetStatus(id, approverComment)
        .then((res) => {
          setActionState('finished');
          if (res === 200) {
            getPendingItems().then((res) => {
              if (res && res.status && res.status !== 200) {
                setMessageBoxItem(res.message);
                setOpen(!open);
              }
            });
            setId(null);
            setApproverComment('');
          } else {
            throw errorHandler(res);
          }
        })
        .catch((err) => {
          setActionState('error');
          if (err && err.status && err.status !== 200) {
            setMessageBoxItem(err.message);
            setOpen(!open);
          }
        });
    } else {
      // status =0 for reject
      // status=await rejectFormulaStatus(id,approverComment);
      setActionState('loading');
      rejectFormulaStatus(id, approverComment)
        .then((res) => {
          setActionState('finished');
          if (res === 200) {
            getPendingItems().then((res) => {
              if (res && res.status && res.status !== 200) {
                setMessageBoxItem(res.message);
                setOpen(!open);
              }
            });
            setId(null);
            setApproverComment('');
          } else {
            throw errorHandler(res);
          }
        })
        .catch((err) => {
          setActionState('error');
          if (err && err.status && err.status !== 200) {
            setMessageBoxItem(err.message);
            setOpen(!open);
          }
        });
    }
  };

  const getComments = () => {
    setPopupFlag(true);
    if (itemType === 'formulaset') {
      // await  getFormulaSetComments(id);
      getFormulaSetComments(id).then((res) => {
        if (res && res.status && res.status !== 200) {
          setMessageBoxItem(errorHandler(res).message);
          setOpen(!open);
        }
        // console.log("comments-get",formulaSetComments.approvarComment);
        // setApproverComment(formulaSetComments.approvarComment);
      });
    } else if (itemType === 'formula') {
      // await  getFormulaComments(id);
      getFormulaComments(id).then((res) => {
        if (res && res.status && res.status !== 200) {
          setMessageBoxItem(errorHandler(res).message);
          setOpen(!open);
        }
        // console.log("comments-get",formulaComments.approvarComment);
        // setApproverComment(formulaComments.approvarComment);
      });
    } else if (itemType === 'campaign') {
      setApproverComment(campaignComments.approverComment);
    }
  };
  const approve = () => {
    if (approverComment && approverComment.length > 0) {
      return approveFormulaSet();
    }
    // return  alert("Please add approver comments.")
    setMessageBoxItem('Please add approver comments.');
    setOpen(!open);
  };

  const reject = () => {
    if (approverComment && approverComment.length > 0) {
      return rejectFormulaSet();
    }
    // return alert("Please add approver comments.")
    setMessageBoxItem('Please add approver comments.');
    setOpen(!open);
  };
  const onClickPendingApproval = (id) => {
    setCurrentId(id.id);
    dispatch(previewWorkInstruction(id.id));
    // setActive(true);
    dispatch(setAuthoringScreenActiveStatus(true));
  };

  const onChangeComment = (value) => {
    setComment(value);
    if (value !== '') {
      setCommentsMandatoryMessage('');
    } else {
      setCommentsMandatoryMessage(MANDATORY_APPROVER_COMMENTS);
    }
  };

  const onClickApproveAll = () => {
    if (comment !== '') {
      setCommentsMandatoryMessage('');
      dispatch(toggleAuthoringScreen(false));
      const payload = {
        workInstrDefId: currentId,
        comments: comment,
      };
      setActionState('loading');
      workInstrAPI
        .approvePendingWorkInstruction(payload)
        .then((res) => {
          getPendingApprovals();
          setComment('');
          setActionState('finished');
          // history.push(AppRoutes.WorkInstruction.path);
        })
        .catch((err) => {
          setActionState('error');
          if (err && err.status && err.status !== 200) {
            setMessageBoxItem(err.message);
            setOpen(!open);
          }
        });
    } else {
      setCommentsMandatoryMessage(MANDATORY_APPROVER_COMMENTS);
    }
  };

  const onClickRejectAll = () => {
    if (comment !== '') {
      setCommentsMandatoryMessage('');
      dispatch(toggleAuthoringScreen(false));
      const payload = {
        workInstrDefId: currentId,
        comments: comment,
      };
      setActionState('loading');
      workInstrAPI
        .rejectPendingWorkInstruction(payload)
        .then((res) => {
          getPendingApprovals();
          setComment('');
          setActionState('finished');
          // history.push(AppRoutes.WorkInstruction.path);
        })
        .catch((err) => {
          setActionState('error');
          if (err && err.status && err.status !== 200) {
            setMessageBoxItem(err.message);
            setOpen(!open);
          }
        });
    } else {
      setCommentsMandatoryMessage(MANDATORY_APPROVER_COMMENTS);
    }
  };

  const rejectCampaign = () => {
    if (approverComment && approverComment.length > 0) {
      const bodyData = {
        id,
        status: CampaignStatusValues.Created,
        comment: approverComment,
      };
      changeCampaignStatus(bodyData);
    } else {
      // return  alert("Please add approver comments.")
      setMessageBoxItem('Please add approver comments.');
      setOpen(!open);
    }
  };

  const changeCampaignStatus = (bodyData) => {
    setActionState('loading');
    UpdateCampaignStatus(bodyData)
      .then((res) => {
        setActionState('finished');
        if (res === 200) {
          getPendingCampaigns();
          setId(null);
          setApproverComment('');
        } else {
          throw errorHandler(res);
        }
      })
      .catch((err) => {
        setActionState('error');
        if (err && err.status && err.status !== 200) {
          setMessageBoxItem(err.message);
          setOpen(!open);
        }
      });
  };

  const approveCampaign = () => {
    if (approverComment && approverComment.length > 0) {
      const bodyData = {
        id,
        status: CampaignStatusValues.Approved,
        comment: approverComment,
      };
      changeCampaignStatus(bodyData);
    } else {
      // return  alert("Please add approver comments.")
      setMessageBoxItem('Please add approver comments.');
      setOpen(!open);
    }
  };

  const onClickComments = () => {
    setShowComment(true);
  };

  const onClickCloseComments = () => {
    setShowComment(false);
  };

  const handleClearEwi = () => {
    dispatch(clearEwi());
  };

  return (
    // <Card className="m-0 mr-4 p-2 shadow-none">
    //   <Card.Content>
    <div className="Approvals">
      {/* {renderModal()} */}
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />
      {popupFlag && (
        <div className="Approvals_comments">
          <div className="Approvals_comments_close">
            <div className="Approvals_comments_close_text">
              <p>Comments</p>
            </div>
            <div className="Approvals_comments_close_close">
              <span onClick={() => setPopupFlag(false)}>X</span>
            </div>
          </div>
          <div className="Approvals_comments_submitter">
            <p>Submitter Comments</p>
            {itemType === 'formulaset' && (
              <textarea value={formulaSetComments.submitterComment} disabled />
            )}
            {itemType === 'formula' && (
              <textarea value={formulaComments.submitterComment} disabled />
            )}
            {itemType === 'campaign' && (
              <textarea value={campaignComments.submitterComment} disabled />
            )}
          </div>
          <div className="Approvals_comments_approver">
            <p>Approver Comments</p>
            {itemType === 'formulaset' && (
              <textarea
                value={approverComment}
                onChange={(event) => setApproverComment(event.target.value)}
              />
            )}
            {itemType === 'formula' && (
              <textarea
                value={approverComment}
                onChange={(event) => setApproverComment(event.target.value)}
              />
            )}
            {itemType === 'campaign' && (
              <textarea
                value={approverComment}
                onChange={(event) => setApproverComment(event.target.value)}
              />
            )}
          </div>
          <div className="Approvals_comments_save">
            <div style={{ msGridColumns: 1, alignItems: 'end' }}>
              <Button
                type="primary"
                size="small"
                onClick={() => setPopupFlag(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="Approvals_leftPanel">
        <PageTitle content="Approvals" />
        {/* Button for testing approved */}
        {/* <button type="button" onClick={clearApprovalNotification}>
          Test Approval
        </button> */}
        <Accordion>
          <Accordion.Content
            arrowPosition="left"
            className="Approvals_leftPanel_Accordion"
            title="Formula sets"
            onClick={() => {
              if (canApproveFormulaAndFormulaSet) {
                handleClearEwi();
                setAccordianActive(
                  accordianActive === 'FormulaSet' ? '' : 'FormulaSet'
                );
              }
            }}
            active={accordianActive === 'FormulaSet'}
            disabled={!canApproveFormulaAndFormulaSet}
          >
            <div className="Approvals_leftPanel_Accordion_div">
              {/* {data.map((item,index)=><Card key={index} item={item}  setId={setId} ></Card>)} */}

              {pendingList &&
                pendingList
                  .filter((item) => {
                    return item.category === 'formulaset';
                  })
                  .map((item, index) => (
                    <CustomCard
                      setFilterData={setFilterData}
                      key={index}
                      item={item}
                      setId={setId}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                      setItemType={setItemType}
                      setApprovalType={setApprovalType}
                    />
                  ))}
            </div>
          </Accordion.Content>
          <Accordion.Content
            title="Formulas"
            arrowPosition="left"
            onClick={() => {
              if (canApproveFormulaAndFormulaSet) {
                handleClearEwi();
                setAccordianActive(
                  accordianActive === 'Formula' ? '' : 'Formula'
                );
              }
            }}
            active={accordianActive === 'Formula'}
            disabled={!canApproveFormulaAndFormulaSet}
          >
            <div
              className="Approvals_leftPanel_Accordion_div_product"
              style={{
                maxHeight: '60vh',
                overflowY: 'auto',
                paddingRight: '0.5rem',
              }}
            >
              {/* {data.map((item,index)=><Card key={index} item={item}  setId={setId}></Card>)} */}
              {pendingList &&
                pendingList
                  .filter((item) => {
                    return item.category === 'formula';
                  })
                  .map((item, index) => (
                    <CustomCard
                      setFilterData={setFilterData}
                      key={index}
                      item={item}
                      setId={setId}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                      setItemType={setItemType}
                      setApprovalType={setApprovalType}
                    />
                  ))}
            </div>
          </Accordion.Content>
          <Accordion.Content
            arrowPosition="left"
            title="Work Instructions"
            onClick={() => {
              if (authEWI) {
                handleClearEwi();
                setAccordianActive(
                  accordianActive === 'WorkInstruction' ? '' : 'WorkInstruction'
                );
              }
            }}
            active={accordianActive === 'WorkInstruction'}
            disabled={!authEWI}
          >
            <div className="ewi-approvals-list wi-cards">
              {pendingApproval &&
                pendingApproval.map((item: WorkInstruction, index) => (
                  <div
                    onClick={() => {
                      setApprovalType('ewi');
                      setComment('');
                      onClickPendingApproval(item);
                    }}
                  >
                    <WICard key={index} ewiItem={item} />
                  </div>
                ))}
            </div>
          </Accordion.Content>
          <Accordion.Content
            arrowPosition="left"
            title="Campaigns"
            onClick={() => {
              if (canApproveCampaign) {
                handleClearEwi();
                setAccordianActive(
                  accordianActive === 'Campaign' ? '' : 'Campaign'
                );
              }
            }}
            active={accordianActive === 'Campaign'}
            disabled={!canApproveCampaign}
          >
            <div
              className="Approvals_leftPanel_Accordion_div_product"
              style={{
                maxHeight: '60vh',
                overflowY: 'auto',
                paddingRight: '0.5rem',
              }}
            >
              {/* {data.map((item,index)=><Card key={index} item={item}  setId={setId}></Card>)} */}
              {PendingCampaignList &&
                PendingCampaignList.map((item, index) => (
                  <CampaignCard
                    key={index}
                    item={item}
                    setId={setId}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    setApprovalType={setApprovalType}
                    setItemType={setItemType}
                  />
                ))}
            </div>
          </Accordion.Content>
        </Accordion>
      </div>
      {approvalType === 'ewi' && isAuthoringScreenActive && (
        <Grid className="wi-layout">
          <Grid.Row>
            <Grid.Column width={4}>
              <Changelog />
            </Grid.Column>
            <Grid.Column width={8}>
              <Card className="wi-card-bg">
                <Card.Header title="Work Instruction" />
                <Card.Content>
                  <WIAuthoringCard />
                </Card.Content>
              </Card>
              <div>
                {isAuthoringControlSetActive &&
                  selectedTask !== null &&
                  !!selectedTask.key && (
                    <AuthoringControlSet
                      previewMode
                      viewJson={selectedTask}
                      getViewJson={handleAuthoringControl}
                    />
                  )}
              </div>
            </Grid.Column>
          </Grid.Row>
          <div className="preview-buttons">
            {/* <TextArea
              placeholder="Comments..."
              onChange={(value) => onChangeComment(value)}
            /> */}
            <span className="d-block mb-0 error-message">
              {commentsMandatoryMessage}
            </span>
            <Permissions
              type="disable"
              allowed={[PermissionValues.ApproveWorkInstruction]}
            >
              {({ authorized }) => (
                <Button
                  type="secondary"
                  content="Comments"
                  onClick={onClickComments}
                  disabled={!authorized}
                />
              )}
            </Permissions>
            <Permissions
              type="disable"
              allowed={[PermissionValues.ApproveWorkInstruction]}
            >
              {({ authorized }) => (
                <Button
                  type="secondary"
                  content="Reject"
                  onClick={onClickRejectAll}
                  disabled={!authorized || actionState === 'loading'}
                />
              )}
            </Permissions>
            <Permissions
              type="disable"
              allowed={[PermissionValues.ApproveWorkInstruction]}
            >
              {({ authorized }) => (
                <Button
                  type="primary"
                  content="Approve"
                  onClick={onClickApproveAll}
                  disabled={!authorized || actionState === 'loading'}
                />
              )}
            </Permissions>
          </div>
        </Grid>
      )}
      <Modal
        open={showComment}
        closeIcon
        onClose={() => {
          setComment('');
          onClickCloseComments();
        }}
        closeOnDimmerClick={false}
        className="add-view-comments"
        size="small"
      >
        <Modal.Header>
          <h6>Add comments</h6>
        </Modal.Header>
        <Modal.Content>
          <div className="d-flex w-100 justify-content-between">
            <span className="title-text">Approver comments</span>
          </div>
          <TextArea
            placeholder="Comments..."
            rows={2}
            value={comment}
            onChange={(value) => onChangeComment(value)}
            className="approver-comments"
          />
          <Modal.Footer>
            <Button
              type="primary"
              content="Save"
              disabled={!comment}
              onClick={onClickCloseComments}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {approvalType === 'formula' &&
        pendingList &&
        (pendingList.filter((item) => {
          return item.category === 'formulaset';
        }).length > 0 ||
          pendingList.filter((item) => {
            return item.category === 'formula';
          }).length > 0) &&
        id !== null && (
          <div className="Approvals_rightPanel_main">
            <div className="Approvals_rightPanel">
              <Card className="mt-0 bg-light-550-force">
                <Card.Content>
                  <Filter
                    itemType={itemType}
                    filterData={filterData}
                    setFilterData={setFilterData}
                  />

                  <div className="mt-4">
                    <Header
                      itemType={itemType}
                      formulaSetInfo={formulaSetInfo}
                      formulaInfo={formulaInfo}
                    />
                  </div>
                  <div className="mt-4">
                    <CompareTable
                      itemType={itemType}
                      filterData={filterData}
                      id={id}
                      setId={setId}
                      getFormulaSet={getFormulaSet}
                      formulaSetInfo={formulaSetInfo}
                      getFormula={getFormula}
                      formulaInfo={formulaInfo}
                    />
                  </div>
                </Card.Content>
              </Card>
            </div>
            <div />
            <div className="Approvals_buttonActions">
              <div style={{ msGridColumns: 1 }}>
                <Permissions
                  type="disable"
                  allowed={[PermissionValues.ApprovaAndReject]}
                >
                  {({ authorized }) => (
                    <Button
                      type="secondary"
                      size="small"
                      content="Comments"
                      disabled={!authorized}
                      onClick={() => {
                        return getComments();
                      }}
                    />
                  )}
                </Permissions>
              </div>
              <div style={{ msGridColumns: 2 }}>
                <Permissions
                  type="disable"
                  allowed={[PermissionValues.ApprovaAndReject]}
                >
                  {({ authorized }) => (
                    <Button
                      type="secondary"
                      size="small"
                      disabled={!authorized || actionState === 'loading'}
                      onClick={() => {
                        return reject();
                      }}
                      content="Reject"
                    />
                  )}
                </Permissions>
              </div>
              <div style={{ msGridColumns: 3 }}>
                <Permissions
                  type="disable"
                  allowed={[PermissionValues.ApprovaAndReject]}
                >
                  {({ authorized }) => (
                    <Button
                      type="primary"
                      size="small"
                      disabled={!authorized || actionState === 'loading'}
                      // className="Approvals_buttonActions_approve"
                      onClick={() => {
                        return approve();
                      }}
                      content="Approve"
                    />
                  )}
                </Permissions>
              </div>
            </div>
          </div>
        )}
      {approvalType === 'campaign' && id !== null && (
        <div className="Approvals_rightPanel_main">
          <div className="Approvals_rightPanel">
            <CampaignApprovalDetails
              campainId={id}
              setCampaignComments={setCampaignComments}
            />
          </div>
          <div className="Approvals_buttonActions">
            <div style={{ msGridColumns: 1 }}>
              <Permissions
                type="disable"
                allowed={[PermissionValues.ApproveProductionCampaign]}
              >
                {({ authorized }) => (
                  <Button
                    type="secondary"
                    size="small"
                    content="Comments"
                    disabled={!authorized}
                    onClick={() => {
                      return getComments();
                    }}
                  />
                )}
              </Permissions>
            </div>
            <div style={{ msGridColumns: 2 }}>
              <Permissions
                type="disable"
                allowed={[PermissionValues.ApproveProductionCampaign]}
              >
                {({ authorized }) => (
                  <Button
                    type="secondary"
                    size="small"
                    onClick={() => {
                      return rejectCampaign();
                    }}
                    content="Reject"
                    disabled={!authorized || actionState === 'loading'}
                  />
                )}
              </Permissions>
            </div>
            <div style={{ msGridColumns: 3 }}>
              <Permissions
                type="disable"
                allowed={[PermissionValues.ApproveProductionCampaign]}
              >
                {({ authorized }) => (
                  <Button
                    type="primary"
                    size="small"
                    // className="Approvals_buttonActions_approve"
                    onClick={() => {
                      return approveCampaign();
                    }}
                    content="Approve"
                    disabled={!authorized || actionState === 'loading'}
                  />
                )}
              </Permissions>
            </div>
          </div>
        </div>
      )}
      {!approvalType && (
        <div className="Approvals_rightPanel_main">
          <div className="Approvals_rightPanel">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: '75vh' }}
            >
              <div className="font-size-24 text-dark-200 text-semibold">
                {pendingItemsCount
                  ? `${pendingItemsCount} items pending for approval.`
                  : 'No pending approvals.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    //    </Card.Content>
    // </Card>
  );
};

export default withApprovalContext(Approvals);
