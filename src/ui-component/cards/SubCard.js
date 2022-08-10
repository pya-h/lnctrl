import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = forwardRef(({ children, content, contentClass, darkBorder, darkTitle,background, secondary, sx = {}, contentSX = {}, title, ...others }, ref) => {
    const theme = useTheme();

    return (
        <Card
            ref={ref}
            sx={{
                color: 'black',
                border: '1px solid',
                background,
                borderColor: !darkBorder ? theme.palette.primary.light : null,
                ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 50%)',
                },
                ...sx
            }}
            {...others}
        >
            {/* card header and action */}
            {!darkTitle && title && <CardHeader sx={{ p: 2.5, borderBottom: !darkBorder ? null : "1px solid black" }} title={<Typography variant="h5">{title}</Typography>} action={secondary} />}
            {darkTitle && title && <CardHeader sx={{ p: 2.5, borderBottom: !darkBorder ? null : "1px solid black" }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />}

            {/* content & header divider */}
            {title && (
                <Divider
                    sx={{
                        opacity: 1,
                        borderColor: theme.palette.primary.light
                    }}
                />
            )}

            {/* card content */}
            {content && (
                <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
                    {children}
                </CardContent>
            )}
            {!content && children}
        </Card>
    );
});

SubCard.propTypes = {
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    sx: PropTypes.object,
    contentSX: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

SubCard.defaultProps = {
    content: true
};

export default SubCard;
