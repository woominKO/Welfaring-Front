import { useState } from "react";
import {
    Box,
    Stack,
    Typography,
    Card,
    CardContent,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Divider,
} from "@mui/material";
import { AutoAwesome, Close } from "@mui/icons-material";

export interface BenefitDetail {
    description: string;
    eligibility: string[];
    applicationMethod: string[];
    requiredDocuments: string[];
    supportAmount: string;
    contactInfo: string;
}

export interface BenefitCard {
    id: string;
    title: string;
    conditions: string[];
    detail?: BenefitDetail;
}

interface SummaryStepProps {
    title: string;
    count: number;
    cards: BenefitCard[];
    onApplyClick?: (card: BenefitCard) => void;
}

const SummaryStep = ({
    title,
    count,
    cards,
    onApplyClick,
}: SummaryStepProps) => {
    const [selectedCard, setSelectedCard] = useState<BenefitCard | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleApplyClick = (card: BenefitCard) => {
        setSelectedCard(card);
        setOpenDialog(true);
        onApplyClick?.(card);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCard(null);
    };
    return (
        <Stack gap={1.5} >
            {/* 제목 */}
            <Stack direction="row" alignItems="center" gap={1.5} color="primary.main">
                <AutoAwesome sx={{ fontSize: 30, color: "primary.main" }} />
                <Typography variant="h3" fontWeight={700}>
                    {title} ({count}건)
                </Typography>
            </Stack>

            {/* 카드 그리드 */}
            <Box
                sx={{
                    bgcolor: "primary.main",
                    borderRadius: 2,
                    p: 3,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                }}
            >
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={2}
                    justifyContent="center"
                >
                    {cards.map((card, index) => {
                        // 색상 배열 (4개 색상이 순환)
                        const colors = [
                            "#6FB1DC", // 0, 4, 8...
                            "#3F8CBF", // 1, 5, 9...
                            "#3162A7", // 2, 6, 10...
                            "#4E6BA9", // 3, 7, 11...
                        ];
                        const colorIndex = index % 4;
                        const currentColor = colors[colorIndex];
                        
                        // hover 색상 (현재 색상을 조금 더 어둡게)
                        const hoverColors = [
                            "#5B9BC5", // #6FB1DC를 어둡게
                            "#3379A5", // #3F8CBF를 어둡게
                            "#28518A", // #3162A7를 어둡게
                            "#3F5594", // #4E6BA9를 어둡게
                        ];
                        const hoverColor = hoverColors[colorIndex];
                        
                        return (
                            <Card
                                key={`${card.id}-${index}`}
                                sx={{
                                    minWidth: { xs: "100%", sm: "100%", md: "calc(50% - 8px)" },
                                    maxWidth: { xs: "100%", sm: "100%", md: "calc(50% - 8px)" },
                                    borderRadius: 2,
                                    boxShadow: "0 2px 8px rgba(78, 107, 169, 0.15)",
                                    border: "1px solid rgba(111, 177, 220, 0.2)",
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: "background.paper",
                                }}
                            >
                                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                    <Typography
                                        variant="h2"
                                        fontWeight={700}
                                        sx={{ mb: 2 }}
                                    >
                                        {card.title}
                                    </Typography>

                                    <Stack gap={1.5} sx={{ mb: 2}}>
                                        <Typography
                                            variant="h4"
                                            fontSize={17}
                                            fontWeight={600}
                                            color="text.secondary"
                                            sx={{
                                                position: "relative",
                                                pl: 3,
                                                "&::before": {
                                                    content: '"•"',
                                                    position: "absolute",
                                                    left: 8,
                                                },
                                            }}
                                        >
                                            신청조건
                                        </Typography>

                                        <Stack gap={1} sx={{ pl: 4 }}>
                                            {card.conditions.map((condition, idx) => (
                                                <Typography
                                                    key={idx}
                                                    variant="body1"
                                                    color="text.secondary"
                                                    sx={{
                                                        position: "relative",
                                                        pl: 2,
                                                        "&::before": {
                                                            content: '"•"',
                                                            position: "absolute",
                                                            left: 0,
                                                        },
                                                    }}
                                                >
                                                    {condition}
                                                </Typography>
                                            ))}
                                        </Stack>
                                    </Stack>

                                    <Button
                                        variant="contained"
                                        onClick={() => handleApplyClick(card)}
                                        fullWidth
                                        sx={{
                                            mt: "auto",
                                            fontSize: "1.1rem",
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            py: 1,
                                            textTransform: "none",
                                            backgroundColor: currentColor,
                                            "&:hover": {
                                                backgroundColor: hoverColor,
                                            },
                                        }}
                                    >
                                        신청하기 →
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Stack>
            </Box>

            {/* 상세 정보 다이얼로그 */}
            {selectedCard && (
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description"
                    sx={{
                        "& .MuiDialog-paper": {
                            borderRadius: 2,
                        },
                    }}
                >
                    <DialogTitle id="dialog-title">
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" gap={1}>
                                <AutoAwesome sx={{ color: "primary.main" }} />
                                <Typography variant="h6" fontWeight={700}>
                                    {selectedCard.title}
                                </Typography>
                            </Stack>
                            <IconButton 
                                onClick={handleCloseDialog} 
                                size="small"
                                aria-label="닫기"
                                autoFocus
                            >
                                <Close />
                            </IconButton>
                        </Stack>
                    </DialogTitle>

                    <Divider />

                    <DialogContent id="dialog-description">
                        {selectedCard.detail ? (
                            <Stack gap={3} sx={{ py: 2 }}>
                                {/* 설명 */}
                                <Box>
                                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                        {selectedCard.detail.description}
                                    </Typography>
                                </Box>

                                {/* 신청 자격 */}
                                <Box>
                                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>
                                        신청 자격
                                    </Typography>
                                    <Stack gap={1}>
                                        {selectedCard.detail.eligibility.map((item, index) => (
                                            <Typography
                                                key={index}
                                                variant="body2"
                                                sx={{
                                                    position: "relative",
                                                    pl: 2,
                                                    "&::before": {
                                                        content: '"•"',
                                                        position: "absolute",
                                                        left: 0,
                                                    },
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </Box>

                                {/* 신청 방법 */}
                                <Box>
                                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>
                                        신청 방법
                                    </Typography>
                                    <Stack gap={1}>
                                        {selectedCard.detail.applicationMethod.map((item, index) => (
                                            <Typography
                                                key={index}
                                                variant="body2"
                                                sx={{
                                                    position: "relative",
                                                    pl: 2,
                                                    "&::before": {
                                                        content: '"•"',
                                                        position: "absolute",
                                                        left: 0,
                                                    },
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </Box>

                                {/* 필요 서류 */}
                                <Box>
                                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>
                                        필요 서류
                                    </Typography>
                                    <Stack gap={1}>
                                        {selectedCard.detail.requiredDocuments.map((item, index) => (
                                            <Typography
                                                key={index}
                                                variant="body2"
                                                sx={{
                                                    position: "relative",
                                                    pl: 2,
                                                    "&::before": {
                                                        content: '"•"',
                                                        position: "absolute",
                                                        left: 0,
                                                    },
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </Box>

                                {/* 지원 금액 */}
                                <Box>
                                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>
                                        지원 금액
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedCard.detail.supportAmount}
                                    </Typography>
                                </Box>

                                {/* 문의처 */}
                                <Box>
                                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>
                                        문의처
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedCard.detail.contactInfo}
                                    </Typography>
                                </Box>
                            </Stack>
                        ) : (
                            <Stack gap={3} sx={{ py: 2 }}>
                                <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
                                    상세 정보가 없습니다.
                                </Typography>
                            </Stack>
                        )}
                    </DialogContent>

                    <Divider />

                    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            onClick={handleCloseDialog}
                            sx={{
                                minWidth: 120,
                                borderRadius: 2,
                                py: 1.5,
                                fontSize: "1rem",
                            }}
                        >
                            확인
                        </Button>
                    </Box>
                </Dialog>
            )}
        </Stack>
    );
};

export default SummaryStep;

