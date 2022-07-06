import PropTypes from 'prop-types';
import './home.css';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemText, Typography } from '@mui/material';
// project imports
import MainCard from 'views/ui-component/cards/MainCard';
import TotalIncomeCard from 'views/ui-component/cards/Skeleton/SectionCard';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { NavLink, useNavigate } from 'react-router-dom';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.success[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.success[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const ChapterSelectDarkCard = ({ title, subtitle, link, isLoading }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={true} content={false}>
                    <Box onClick={() => navigate(link)} className="chapter-select-dark-card" sx={{ p: 2.5 }}>
                        <List sx={{ py: 3.5 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <NavLink to={link} >
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.primary[800],
                                            color: '#fff'
                                        }}
                                    >
                                        <TableChartOutlinedIcon fontSize="inherit" />
                                    </Avatar>
                                </NavLink>
                                <ListItemText
                                    sx={{
                                        textAlign: 'center',
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45,
                                        mx: 2                                }}
                                    primary={
                                        <Typography variant="h4" sx={{fontSize: '30px', color: '#000' }}>
                                            { title }
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" sx={{ fontSize: '18px', color: 'primary.light', mt: 1.5 }}>
                                            { subtitle }
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

ChapterSelectDarkCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ChapterSelectDarkCard;
