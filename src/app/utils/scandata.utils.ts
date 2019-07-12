import { HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

declare var jQuery: any;
declare var swal: any;

export class ScandataUtils {
  private authTokenName = 'authTokenName';
  private dealerTokenName = 'dealerTokenName';

  getLink(linkString) {
    return environment.API_ENDPOINT + linkString;
  }

  getJsonHeaders() {
    return { headers: { 'Content-Type': 'application/json' } };
  }

  convertToFormDataString(data) {
    let formData = new HttpParams();
    Object.keys(data).forEach((key) => {
      formData = formData.append(key, data[key]);
    });
    return formData.toString();
  }

  updateToken(token) {
    localStorage.setItem(this.authTokenName, token);
  }

  updateLocationToken(token) {
    if (token) {
      localStorage.setItem(this.dealerTokenName, token);
    } else {
      localStorage.setItem(this.dealerTokenName, null);
    }
  }

  HTMLDatetoIsoDate(htmlDate) {
    const year = Number(htmlDate.toString().substring(0, 4));
    const month = Number(htmlDate.toString().substring(5, 7));
    const day = Number(htmlDate.toString().substring(8, 10));
    return new Date(year, month - 1, day);
  }

  getDateFromMilliSeconds(milliseconds) {
    const d = new Date(0);
    d.setUTCMilliseconds(milliseconds);
    return d.toString();
  }

  getLocalDateFromUTC(utcSeconds) {
    let d = new Date(0);
    if (utcSeconds) {
      d.setUTCMilliseconds(utcSeconds);
    } else {
      d = new Date();
    }

    return d;
  }

  utcToShortDate(utcDate) {
    const date = this.getLocalDateFromUTC(utcDate);
    const getDate: any = date.getDate();
    const getMonth: any = date.getMonth();
    const getFullYear: any = date.getFullYear();

    const dtString =
      getDate < 10 && getDate.toString().length === 1
        ? '0' + getDate
        : String(getDate);
    const monthString =
      getMonth + 1 < 10 && getMonth.toString().length === 1
        ? '0' + Number(getMonth + 1)
        : String(getMonth + 1);

    return monthString + '/' + dtString + '/' + getFullYear;
  }

  roundPrice(price) {
    const returnPrice = price.toFixed(3);
    return returnPrice.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
  }

  utcDateToHtmlDate(utcDate) {
    const isoDate = new Date(utcDate).toISOString();
    const date = new Date(isoDate);
    let dtString = '';
    let monthString = '';
    if (date.getDate() < 10) {
      dtString = '0' + date.getDate();
    } else {
      dtString = String(date.getDate());
    }
    if (date.getMonth() + 1 < 10) {
      monthString = '0' + Number(date.getMonth() + 1);
    } else {
      monthString = String(date.getMonth() + 1);
    }
    return monthString + '/' + dtString + '/' + date.getFullYear();
  }

  formatHtmlDateComponent(dateComponent) {
    return (dateComponent < 10 ? '0' : '') + dateComponent;
  }

  formatHtmlDate(date) {
    return (
      this.formatHtmlDateComponent(date.getMonth() + 1) +
      '/' +
      this.formatHtmlDateComponent(date.getDate()) +
      '/' +
      date.getFullYear()
    );
  }

  getCurrentDate() {
    const date = new Date();
    const d = String(date.getDate());
    return d;
  }

  getCurrentMonth() {
    const date = new Date();
    const m = String(date.getMonth() + 1);
    return m;
  }

  getStartQuarter() {
    const d = new Date();
    const quarter = Math.floor(d.getMonth() / 3);
    return new Date(d.getFullYear(), quarter * 3, 1);
  }

  getEndQuarter() {
    const firstDate = this.getStartQuarter();
    return this.getDayEnd(
      new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0),
    );
  }

  getDayEnd(inputDate) {
    inputDate.setHours(23, 59, 59, 999);
    return inputDate;
  }

  getLastQuarterStart() {
    const d = new Date();
    const quarter = Math.floor(d.getMonth() / 3);
    return new Date(d.getFullYear(), quarter * 3 - 3, 1);
  }

  getLastQuarterEnd() {
    const firstDate = this.getLastQuarterStart();
    return this.getDayEnd(
      new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0),
    );
  }

  getCurrentYear() {
    const date = new Date();
    const y = date.getFullYear();
    return y;
  }

  getStartYear(count) {
    const curr = new Date();
    return '01/01/' + (curr.getFullYear() + count);
  }

  getEndYear(count) {
    const curr = new Date();
    return '12/31/' + (curr.getFullYear() + count);
  }

  getMonth(month, day) {
    const curr = new Date();
    return this.formatHtmlDate(
      new Date(curr.getFullYear(), curr.getMonth() + month, day),
    );
  }

  getPreviousMonth() {
    const curr = new Date();
    return this.formatHtmlDate(
      new Date(
        curr.getFullYear() - (curr.getMonth() > 0 ? 0 : 1),
        (curr.getMonth() - 1 + 12) % 12,
        1,
      ),
    );
  }

  getWeek(count) {
    const curr = new Date();
    return this.formatHtmlDate(
      new Date(curr.setDate(curr.getDate() - curr.getDay() + count)),
    );
  }

  getDefaultstartDate() {
    const today = new Date();
    const priorDate = new Date().setDate(today.getDate() - 30);
    return this.utcDateToHtmlDate(priorDate);
  }

  getDefaultendDate() {
    const date = new Date();
    let dtString = '';
    let monthString = '';
    if (date.getDate() < 10) {
      dtString = '0' + date.getDate();
    } else {
      dtString = String(date.getDate());
    }
    if (date.getMonth() + 1 < 10) {
      monthString = '0' + Number(date.getMonth() + 1);
    } else {
      monthString = String(date.getMonth() + 1);
    }
    return monthString + '/' + dtString + '/' + date.getFullYear();
  }

  getLastMonthFromNow() {
    const date = new Date();
    let monthString = '';
    monthString = String(date.getMonth());
    return monthString;
  }

  getMonthFromNow() {
    const date = new Date();
    let monthString = '';
    monthString = String(date.getMonth() + 2);
    return monthString;
  }

  getDateFromToday(daysToAdd) {
    const today = new Date();
    let targetDate: any = new Date().setDate(today.getDate() + daysToAdd);
    targetDate = this.utcToShortDate(targetDate);
    return targetDate;
  }

  getDayEndFromToday(daysToAdd) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysToAdd);
    targetDate.setHours(23, 59, 59, 999);
    return targetDate;
  }

  getDayStartFromToday(daysToAdd) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysToAdd);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate;
  }

  getIsoDateFromString(date) {
    return new Date(date).toISOString();
  }

  getDayEndIso(stringDate) {
    const targetDate = new Date(stringDate);
    targetDate.setHours(23, 59, 59, 999);
    return this.getIsoDateFromString(targetDate);
  }

  getDayStartIso(stringDate) {
    const targetDate = new Date(stringDate);
    targetDate.setHours(0, 0, 0, 0);
    return this.getIsoDateFromString(targetDate);
  }

  formattedDateObject(date) {
    const date_array = [];
    const str_array = date.split('/');

    const formatted_date = {
      month: Number(str_array[0]),
      day: Number(str_array[1]),
      year: Number(str_array[2]),
    };
    return formatted_date;
  }

  closeModal(id) {
    jQuery(id).modal('hide');
  }

  openModal(id) {
    jQuery(id).modal('show');
  }

  doLogout() {
    localStorage.clear();
  }

  showSuccess(title, text) {
    swal({
      title,
      text,
      type: 'success',
      timer: 2000,
    });
  }

  showError(title, text) {
    swal({
      title,
      text,
      type: 'error',
      timer: 2000,
    });
  }

  showWarning(title, text) {
    swal({
      title,
      text,
      type: 'warning',
      timer: 2000,
    });
  }

  showConfirm(title, text) {
    swal(
      {
        title,
        text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        closeOnConfirm: false,
        closeOnCancel: false,
      },
      (isConfirm, subtitle, subtext) => {
        if (isConfirm) {
          swal({
            title: subtitle,
            text: subtext,
            type: 'success',
            timer: 2000,
          });
        } else {
          swal({
            title: subtitle,
            text: subtext,
            type: 'error',
          });
        }
      },
    );
  }

  diff_days(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.round(diff));
  }
}
