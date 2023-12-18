import RouthHurwitzCriterionLecture from "./lecture";
import { Grid, InputAdornment, TextField } from "@mui/material";
import RouthHurwitzCriterionSolveBox from "./solve";
import { MathJax } from "better-react-mathjax";
import { gridSpacing } from "store/constant";
import { stringToArray } from "math/calculus";
import TopicBaseComponent from "views/topics/TopicBaseComponent";

class RouthHurwitzCriterion extends TopicBaseComponent {
	state = {
		rawInput: "",
		a_i: [],
		topicKey: "ch4-rhw",
		epsilon: 0.000001,
		showEpsilonBar: false,
	};

	$rawInput = (value) => {
		this.setState({
			rawInput: value,
			a_i: stringToArray(value),
			showEpsilonBar: false,
		});
	};

	setShowEpsilonBar = (ok) => {
		this.setState((state) => {
			state.showEpsilonBar = ok;
			return state;
		});
	};

	$epsilon = (value) => {
		this.setState((state) => {
			state.epsilon = value;
			return state;
		});
	};

	render() {
		const { rawInput, a_i, epsilon, showEpsilonBar } = this.state;

		return (
			<Grid container direction="column" spacing={gridSpacing}>
				<Grid
					style={{
						width: "100%",
						height: "100%",
						margin: "auto",
						direction: "ltr",
					}}
					item
				>
					<RouthHurwitzCriterionLecture />
				</Grid>

				<Grid
					spacing={gridSpacing}
					style={{
						width: "100%",
						height: "100%",
						margin: "auto",
						marginTop: "1%",
						direction: "ltr",
					}}
					container
				>
					<Grid xs={12} item>
						<TextField
							onChange={(e) => this.$rawInput(e.target.value)}
							value={rawInput}
							style={{ width: "100%" }}
							sx={{ px: 1 }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="left">
										<MathJax>
											{"$$P(s) = \\Sigma \\lgroup$$"}
										</MathJax>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="right">
										<MathJax>{"$$ \\rgroup s^i$$"}</MathJax>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					{showEpsilonBar && (
						<Grid xs={12} item>
							<TextField
								onChange={(e) => this.$epsilon(e.target.value)}
								value={epsilon}
								style={{ width: "100%" }}
								sx={{ px: 1 }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="left">
											<MathJax>
												{"$$\\epsilon = $$"}
											</MathJax>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
					)}
					<hr />
					<Grid xs={12} item>
						<RouthHurwitzCriterionSolveBox
							a_i={a_i}
							epsilon={epsilon}
							showEpsilonBar={this.setShowEpsilonBar}
						/>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}
export default RouthHurwitzCriterion;
