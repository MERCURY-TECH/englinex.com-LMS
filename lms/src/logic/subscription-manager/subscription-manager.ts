
import User from "../models/User";
import { voteObjectTypeEnum } from "./baro-vote";
import { VotingEvents } from "./event-names";
import resolution from "../models/resolution";
import EventMediator from "../api/event-service";
import RealTimeVoteCommunicator from "../../api/socket/socket";


export default class VoteSessionManager {
    // sessionStart: Date = new Date();
    // static instance: any;
    // mediator = EventMediator.mediator;
    // endDate: Date = new Date()
    // startDate: Date = new Date();
    // votingSessions: any = {};
    // repository: any;

    // constructor(repository: any) {
    //     this.repository = repository;
    //     if (VoteSessionManager.instance) return VoteSessionManager.instance;
    //     VoteSessionManager.instance = this;
    //     this.startWorker()
    // }

    // async startWorker() {
    //     let getValidSessions = await this.repository.getValidSessions();
    //     let validSessions: any[] = await getValidSessions();
    //     for (let session of validSessions) {
    //         this.votingSessions[session._id] = {} as any
    //         this.votingSessions[session._id]['session-activity'] = session;
    //         this.votingSessions[session._id]['dirtyState'] = false;
    //         this.initUpdateEventListeners(session);
    //         this.runWorkerOnSingleSessions(this.votingSessions[session._id]);
    //     }
    //     this.setExtraEventlisteners();
    // }
    // initUpdateEventListeners(session: any) {
    //     this.mediator.on(session._id + '-update', async (data: any) => {
    //         let getSessionByID = await this.repository.getSessionByID();
    //         let updatedSession = await getSessionByID(data._id);
    //         this.votingSessions[data._id].dirtyState = true;
    //             this.votingSessions[data._id]['session-activity'] = updatedSession;
    //             this.votingSessions[data._id].dirtyState = false;
    //             await this.runWorkerOnSingleSessions(this.votingSessions[data._id]);
    //     });
    // }

    // setExtraEventlisteners(){
    //     this.mediator.on('new-session', (data: any) => {
    //         this.votingSessions[data._id] = {} as any
    //         this.votingSessions[data._id]['session-activity'] = data;
    //         this.votingSessions[data._id]['dirtyState'] = false;
    //         this.runWorkerOnSingleSessions(this.votingSessions[data._id]);
    //     })
    //     this.mediator.on('session-update',async (data:any)=>{
    //         if(this.votingSessions[data._id]) return;
    //         let getSessionByID = await this.repository.getSessionByID();
    //         let updatedSession = await getSessionByID(data._id);
    //         this.votingSessions[data._id] = {} as any
    //         this.votingSessions[data._id]['session-activity'] = updatedSession;
    //         this.votingSessions[data._id]['dirtyState'] = false;
    //         this.runWorkerOnSingleSessions(this.votingSessions[data._id]);
    //     })
    // }


    // runWorkerOnMultipleSessions() {
    //     let socketObject = new RealTimeVoteCommunicator();
    //     for (let sessionInternalTrackingState of Object.values(this.votingSessions)) {
    //         this.runSessionWorkerActivityCheck(sessionInternalTrackingState, socketObject);
    //     }
    // }
    // async runWorkerOnSingleSessions(sessionInternalTrackingState: any) {
    //     let socketObject = new RealTimeVoteCommunicator();
    //     return await this.runSessionWorkerActivityCheck(sessionInternalTrackingState, socketObject);
    // }

    // async runSessionWorkerActivityCheck(sessionInternalTrackingState: any, voteSocketObject: RealTimeVoteCommunicator): Promise<any> {
    //     if (sessionInternalTrackingState.dirtyState) return

    //     let session: any = sessionInternalTrackingState['session-activity'];
    //     let today = new Date();
    //     let sessionStartDate: Date = new Date(session.sessionStartDate);
    //     let sessionDuration = session.sessionDuration as number;
    //     let endDate = new Date(sessionStartDate.getTime() + sessionDuration * 60 * 60 * 1000);
    //     console.log(this.evaluateTimeLeft(session))
    //     voteSocketObject.customEvent(session._id + '-time-count', this.evaluateTimeLeft(session));
    //     if ((today >= sessionStartDate && today <= endDate)) {
    //         if (!session.sessionState.ongoing) {
    //             session.sessionState.ongoing = true;
    //             session.sessionState.isElectionStarted = true;
    //             await session.save();
    //             this.startVotingSession(session);
    //         }
    //     }
    //     if ((today <= endDate)) {
    //         if (!session.sessionState.valid) {
    //             session.sessionState.valid = true;
    //             session.sessionState.terminated = false;
    //             await session.save();
    //         }
    //     }
    //     if (today > new Date(endDate)) {
    //         if (!sessionInternalTrackingState.dirtyState) {
    //             session.sessionState.terminated = true;
    //             session.sessionState.valid = false;
    //             session.sessionState.ongoing = false;
    //             session.sessionState.isElectionStarted = false;
    //             await session.save();
    //             this.stopVotingSession(session);
    //             sessionInternalTrackingState.dirtyState = true
    //         }
    //     }
    //     if (!(sessionInternalTrackingState.dirtyState)) {
    //         return await setTimeout(async () => (await this.runSessionWorkerActivityCheck(sessionInternalTrackingState, voteSocketObject)), 1000);
    //     }
    // }

    // startVotingSession(session: any) {
    //     console.log('voting start === >>>> ');
    //     let voteSocketObject = new RealTimeVoteCommunicator();
    //     voteSocketObject.onElectionStart(VotingEvents.startvoting, session.sessionState);
    // }

    // stopVotingSession(session: any) {
    //     console.log('voting stopped === >>>> ');
    //     let results = this.electWinners(session)
    //     let voteSocketObject = new RealTimeVoteCommunicator();
    //     voteSocketObject.onElectionFinish(VotingEvents.voteResult, { session, results });
    // }

    // /**
    //  * @description Function that elect the resolutions of the platform
    //  */
    // async electPolls(session: any, voteObject: any) {
    //     let votingScore: any = {}
    //     let pollResInit: any = {}
    //     for (const pollRes of session?.pollResponses) { pollResInit[pollRes] = 0; }
    //     session.votes.forEach((vote: any) => {
    //         vote.candidateObjectList.forEach((voteItem: any) => {
    //             let votePollResponse = voteItem.pollResponse.toUpperCase();
    //             if (!(session.pollResponses.includes(votePollResponse.toUpperCase()))) throw new Error('Please provide valid poll response values for vote item ' + voteItem);
    //             if (!(votingScore[voteItem.candidateID])) {
    //                 votingScore[voteItem.candidateID] = {}
    //                 votingScore[voteItem.candidateID]['pollResponse'] = { ...pollResInit };
    //                 votingScore[voteItem.candidateID]['pollResponse'][votePollResponse] = 1;
    //                 votingScore[voteItem.candidateID]['candidateObjectID'] = voteItem.candidateID;
    //             }
    //             else {
    //                 votingScore[voteItem.candidateID]['pollResponse'][votePollResponse] ? ++votingScore[voteItem.candidateID]['pollResponse'][votePollResponse] : votingScore[voteItem.candidateID]['pollResponse'][votePollResponse] = 1;
    //             }
    //         });
    //     });
    //     if (Object.keys(votingScore)) {
    //         let resolutions = await voteObject.find().where('_id').in(Object.keys(votingScore)).exec();
    //         session.results = resolutions?.map((element: any) => {
    //             votingScore[element._id]['resolution'] = element;
    //             return votingScore[element._id]
    //         })
    //         await session.save();
    //         return [...Object.values(votingScore)]
    //     }
    // }

    // async electLawyers(session: any, voteObject: any) {
    //     let votingScore: any = {}
    //     session.votes.forEach((vote: any) => {
    //         vote.candidateObjectList.forEach((voteItem: any) => {
    //             if (votingScore[voteItem.candidateID] === undefined) {
    //                 votingScore[voteItem.candidateID] = 1
    //             } else {
    //                 votingScore[voteItem.candidateID] += 1
    //             }
    //         });
    //     });
    //     let voteRanking: any = []
    //     if (Object.keys(votingScore)) {
    //         let sortedVotingScore = Object.keys(votingScore)
    //         voteRanking = sortedVotingScore.slice(0, session.numberObjectsToVote);
    //         const bulkOps = await voteRanking.map((_id: any) => {
    //             return {
    //                 updateOne: {
    //                     filter: {
    //                         _id: _id
    //                     },
    //                     update: {
    //                         voteCount: votingScore[_id]
    //                     }
    //                 }
    //             }
    //         });
    //         await voteObject.bulkWrite(bulkOps);
    //     }
    //     let winners = await voteObject.find({ _id: { $in: voteRanking } });
    //     winners.sort((candidateX: any, candidateY: any) => candidateY.voteCount - candidateX.voteCount)
    //     session.results = [...winners];
    //     await delete session.__v
    //     await session.save()
    //     await voteObject.updateMany({}, { voteCount: 0 });
    //     return [...winners];
    // }

    // async electWinners(session: any) {
    //     let voteObjectref = session.voteObjectType;
    //     let results:any;
    //     if (voteObjectref === voteObjectTypeEnum.resolution) { results = {...(await this.electPolls(session, resolution))}; }
    //     if (voteObjectref === voteObjectTypeEnum.lawyer) { results = {...(await this.electLawyers(session, User))}; }
    //     delete this.votingSessions[session._id];
    //     return results;

    // }

    // evaluateTimeLeft(session: any) {
    //     let today = new Date();
    //     let sessionStartDate: Date = new Date(session.sessionStartDate);
    //     let sessionDuration = session.sessionDuration as number;
    //     let endDate = new Date(sessionStartDate.getTime() + sessionDuration * 60 * 60 * 1000);
    //     let timeToEnd = endDate.getTime() - today.getTime();
    //     let timeToStart = sessionStartDate.getTime() - today.getTime();
    //     let timeToEndDiff = timeToEnd > 0 ? this.calculateTimeDifference(timeToEnd) : { hours: 0, minutes: 0, seconds: 0 }
    //     let timeToStartDiff = timeToStart > 0 ? this.calculateTimeDifference(timeToStart) : { hours: 0, minutes: 0, seconds: 0 }
    //     return { endsIn: timeToEndDiff, startsIn: timeToStartDiff, sessionState: session.sessionState, session: { sessionTitle: session.sessionTitle, sessionID: session._id } }
    // }

    // calculateTimeDifference(timeLeft: any) {
    //     var delta = Math.abs(timeLeft) / 1000;
    //     var days = Math.floor(delta / 86400);
    //     delta -= days * 86400;
    //     var hours = Math.floor(delta / 3600) % 24;
    //     delta -= hours * 3600;
    //     // hours += days*24;
    //     var minutes = Math.floor(delta / 60) % 60;
    //     delta -= minutes * 60;
    //     var seconds = Math.floor(delta % 60);
    //     return { days, hours, minutes, seconds }
    // }
}