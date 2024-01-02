import SpaceStateLecture from "./lecture";
import SpaceStateParameters from "./parameters";
import { Grid } from "@mui/material";
import SpaceStateEquationSolveBox from "./solve";
import TopicBaseComponent from "views/topics/TopicBaseComponent";

export default class SpaceStateExample extends TopicBaseComponent {
	state = {
		A: [
			[0, 1],
			[-3, -4],
		],
		C: [1, 0],
		x_0: [[1], [-1]],
		topicKey: "ch2-ss",
	};

	$A = (matrixA) => this.updateState("A", matrixA);

	$C = (vectorC) => this.updateState("C", vectorC);

	$x_0 = (xInitials) => this.updateState("x_0", xInitials);

	render() {
		const { A, C, x_0 } = this.state;

		return (
			<Grid container direction="column" spacing={1}>
				<Grid
					style={{
						width: "100%",
						height: "100%",
						margin: "auto",
						direction: "ltr",
					}}
					item
				>
					<SpaceStateLecture />
				</Grid>

				<Grid
					spacing={2}
					style={{
						width: "100%",
						height: "100%",
						margin: "auto",
						marginTop: "1%",
						direction: "ltr",
					}}
					container
				>
					<Grid lg={4} md={12} sm={12} xs={12} item>
						<SpaceStateParameters
							A={A}
							$A={this.$A}
							C={C}
							$C={this.$C}
							x_0={x_0}
							$x_0={this.$x_0}
						/>
					</Grid>
					<Grid lg={8} md={12} sm={12} xs={12} item>
						<SpaceStateEquationSolveBox A={A} C={C} x_0={x_0} />
					</Grid>
				</Grid>
			</Grid>
		);
	}
}
