import * as React from "react";

import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import {replace} from "typescript-array-utils";
import {Match, MatchScore, MatchSet} from "../../model/models";
import {MatchRow} from "../MatchRow";
import {Results} from "../Results";

export interface TypingViewProps {
	matchSet: MatchSet;
}

export class TypingView extends React.PureComponent<TypingViewProps, State> {

	public constructor(props: TypingViewProps) {
		super(props);
		this.state = {
			bets: []
		};
	}

	public render(): JSX.Element {
		const elements: Match[] = this.props.matchSet ? this.props.matchSet.matches : [];
		const matches = elements.map((m: Match, index: number) => {
			const score = this.state.bets[index] ? this.state.bets[index] : {home: null, away: null};
			return {
				...m,
				home: {
					...m.home,
					score: score.home
				},
				away: {
					...m.away,
					score: score.away
				}
			} as Match;
		});

		return (
			<div>
				<Grid container={true} spacing={16} style={{marginTop: 16}}>
					{matches.map(this.renderElement)}
				</Grid>
				<Button fullWidth={true} color={"primary"} variant={"raised"}>Zapisz</Button>
				<Results/>

			</div>
		);
	}

	private renderElement = (e: Match, index: number) => {
		return (<MatchRow match={e} key={String(index)} index={index} editDate={false} onChange={this.edit}/>);
	};

	private edit = (match: Match, index: number) => {
		const bets = replace(this.state.bets, index, {
			home: match.home.score,
			away: match.away.score
		});
		this.setState({bets});
	}
}

interface State {
	bets: MatchScore[];
}
