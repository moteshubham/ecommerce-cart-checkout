import * as couponService from '../services/couponService.js';
import * as reportService from '../services/reportService.js';

export const generateCoupon = (req, res) => {
  try {
    const result = couponService.generateCouponIfEligible();
    
    if (result.coupon) {
      res.status(200).json({ 
        coupon: result.coupon,
        generated: result.generated 
      });
    } else {
      res.status(404).json({ 
        error: 'No coupon available. Complete more orders to generate a coupon.' 
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReport = (req, res) => {
  try {
    const report = reportService.generateReport();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

